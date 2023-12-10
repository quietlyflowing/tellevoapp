<?php

namespace App\Http\Controllers;

use App\Models\TravelHistory;
use App\Models\UserData;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CurrentTravel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TravelsController extends Controller
{
    //
    public function startTravel(Request $request)
    {
        switch ($request->is_driver) {
            // {
            //     "is_driver": 1,
            // "start_coordinates": {
            //     "coord_x": 33.1235,
            //     "coord_y": -125.358
            // }
            // }
            case 0:
                DB::beginTransaction();
                try {
                    $travel = CurrentTravel::create(['passenger_id' => $request->user()->id, 'start_coordinates' => json_encode($request->start_coordinates)]);
                    $travel->save();
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollBack();
                    return self::returnJSONBuilder(500, 'ERROR: No se pudo iniciar el viaje. ' . $e->getMessage(), 255);
                }
                return self::returnJSONBuilder(200, 'Viaje del lado del usuario iniciado correctamente', 70, ['travel_id' => $travel->id]);

            case 1:
                $travel = new CurrentTravel();
                $travelId = -99;
                try {
                    $travel = $travel->orderBy('created_at', 'desc')->whereNull('deleted_at')->where('is_taken', '=', '0')->firstOrFail();
                    $travelId = $travel->id;
                } catch (Exception $e) {
                    return self::returnJSONBuilder(200, 'No hay viaje disponible aún', 80);
                }
                DB::beginTransaction();
                try {
                    $toTake = CurrentTravel::find($travelId);
                    $toTake->update(['driver_id' => $request->user()->id, 'is_taken' => 1]);
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollBack();
                    return self::returnJSONBuilder(500, 'Error: No se puede marcar el viaje como no disponible ' . $e->getMessage(), 255);
                }
                return self::returnJSONBuilder(200, 'Viaje con id ' . $travelId . ' tomado correctamente.', 71, ['travel_id' => $travelId]);
        }
    }


    public function monitorTravel(Request $request)
    {
        $travel = CurrentTravel::find($request->query('travel_id'));
        if (is_null($travel)) {
            return self::returnJSONBuilder(200, 'Error: Viaje con id ' . $request->query('travel_id') . ' no encontrado.', 255);
        }
        $response = new StreamedResponse(function() use($travel){
            $travelId = $travel->id;
            $driverId = $travel->driver_id;
            $passengerId= $travel->passenger_id;
            while(true){
                $data = json_encode(['message' => 'Viaje con id ' . $travel->id . ' en curso', 
                'data' => [
                    'travel_id' => $travelId, 
                    'driver_id' => $driverId, 
                    'passenger_id' => $passengerId]]);
                echo "data: $data\n\n";
                ob_flush();
                flush();
                sleep(1);
                $travel = CurrentTravel::find($travelId);
                if (is_null($travel)) {
                    break;
                }
            }
            $data2 = json_encode(['message' => 'Viaje con id ' . $travelId . ' cancelado.',
            'data' => [
                'travel_id' => $travelId, 
                'driver_id' => $driverId, 
                'passenger_id' => $passengerId]
            ]);
            echo "data: $data2\n\n";
            ob_flush();
            flush();
            exit();
        });
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');
        
        return $response;
    }

    public function stopTravel(Request $request)
    {
        // {
        //  "from_coord" : {
        //  "coord_x": 33.123,
        //  "coord_y": 88.125
        //    },
        //  "to_coord": {
        //      "coord_x": 33.123,
        //      "coord_y": 88.125
        //    },
        //   "total_payment": 15800,
        //   "payment_type": 1, 
        //   "travel_id": 1
        // }

        $travel = CurrentTravel::where('id', $request->travel_id);
        
        switch($request->is_driver) {
            
            case 0:
                DB::beginTransaction();
                try {
                    $travel = $travel->where('passenger_id', '=', $request->user()->id)->firstOrFail();
                    $travelHistoryUser = TravelHistory::create([
                    'user_id' => $request->user()->id, 
                    'from_coord' => $travel->start_coordinates, 
                    'to_coord' => $request->end_coordinates,
                    'transport_user' => UserData::where('user_id', '=', $travel->driver_id)->firstOrFail()->nombre,
                    'total_payment' => $request->total_payment,
                    'payment_type' => $request->payment_type]);
                    $travelHistoryDriver = TravelHistory::create([
                    'user_id' => $travel->driver_id, 
                    'from_coord' => $travel->start_coordinates, 
                    'to_coord' => $request->end_coordinates,
                    'transport_user' => UserData::where('user_id', '=', $travel->driver_id)->firstOrFail()->nombre,
                    'total_payment' => $request->total_payment,
                    'payment_type' => $request->payment_type
                    ]);
                    $travel->delete();
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollback();
                    return self::returnJSONBuilder(500, 'No se ha podido cancelar el viaje. ERROR: ' . $e->getMessage(), 255);
                }
                break;
            case 1:
                DB::beginTransaction();
                try {
                    $travel = $travel->where('driver_id', '=', $request->user()->id)->firstOrFail();
                    $travelHistoryUser = TravelHistory::create([
                        'user_id' => $request->user()->id, 
                        'from_coord' => $travel->start_coordinates, 
                        'to_coord' => $request->end_coordinates,
                        'transport_user' => UserData::where('user_id', '=', $travel->driver_id)->firstOrFail()->nombre,
                        'total_payment' => $request->total_payment,
                        'payment_type' => $request->payment_type]);
                        $travelHistoryDriver = TravelHistory::create([
                        'user_id' => $travel->user_id, 
                        'from_coord' => $travel->start_coordinates, 
                        'to_coord' => $request->end_coordinates,
                        'transport_user' => UserData::where('user_id', '=', $travel->passenger_id)->firstOrFail()->nombre,
                        'total_payment' => $request->total_payment,
                        'payment_type' => $request->payment_type
                        ]);
                    $travel->delete();
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollback();
                    return self::returnJSONBuilder(500, 'No se ha podido cancelar el viaje. ERROR: ' . $e->getMessage(), 255);
                }
                break;
        }
        
        return self::returnJSONBuilder(200, 'Viaje con id ' . $travel->id . ' cancelado correctamente.', 255);
    }
}
