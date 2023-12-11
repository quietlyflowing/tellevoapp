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
    public function publishTravel(Request $request)
    {
            // {
            // "passenger_name": "Dummy User"    
            // "start_coordinates": {
            //     "coord_x": 33.1235,
            //     "coord_y": -125.358
            //      },
            // "end_coordinates": {
            //  "coord_x": 55.123,
            //  "coord_y": 88, 198
            //      }
            // }
                DB::beginTransaction();
                try {
                    $travel = CurrentTravel::create([
                        'passenger_id' => $request->user()->id, 
                        'passenger_name' => $request->passenger_name,
                        'start_coordinates' => json_encode($request->start_coordinates), 
                        'end_coordinates' => json_encode($request->end_coordinates),
                        'start_direction' => $request->start_address,
                        'end_direction' => $request->end_address]);
                    $travel->save();
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollBack();
                    return self::returnJSONBuilder(500, 'ERROR: No se pudo iniciar el viaje. ' . $e->getMessage(), 255);
                }
                return self::returnJSONBuilder(200, 'Viaje del lado del usuario iniciado correctamente', 70, ['travel_id' => $travel->id]);
    }

    public function seekAvailableTravels(Request $request){
        $response = new StreamedResponse(function () use ($request) {
            define('SEEKSTARTEDAT', \Carbon\Carbon::now());
            $currentTime = \Carbon\Carbon::now();
            $timeDiff = $currentTime->diffInMinutes(SEEKSTARTEDAT);
            $exitCounter = 0;
            $travelId = -99;
            while(true) {
                DB::beginTransaction();
                try{
                    $travel = CurrentTravel::orderBy('created_at', 'desc')->whereNull('deleted_at')->where('is_taken', '=', 0)->firstOrFail();
                    $travelId = $travel->id;
                    $passengerName = $travel->passenger_name;
                    $userName = UserData::where('user_id', $request->query('user_id'))->firstOrFail()->nombre;
                    $travel->update(['driver_id' => $request->query('user_id'), 'driver_name' => $userName, 'is_taken' => 1, 'tariff' => $request->query('tariff')]);
                    DB::commit();
                    break;
                    } catch (Exception $e) {
                        DB::rollBack();
                        $data = json_encode(['message' => 'No hay viajes disponible aún', 'code' => 80], JSON_UNESCAPED_UNICODE);
                        echo "data: $data\n\n";
                        ob_flush();
                        flush();
                        sleep(2);
                        $currentTime = \Carbon\Carbon::now();
                        $timeDiff = $currentTime->diffInMinutes(SEEKSTARTEDAT);
                        if($timeDiff>=1){
                            while($exitCounter<5){
                                $data3 = json_encode(['message' => 'No hay viajes disponibles aún. Rindiéndose y dando la oportunidad para terminar limpiamente', 'code' => 81], JSON_UNESCAPED_UNICODE);
                                echo "data: $data3\n\n";
                                ob_flush();
                                flush();
                                sleep(1);
                                $exitCounter++;
                            }
                            exit();
                        }
                    }
            }
            while($exitCounter <5) {
                $data2 = json_encode(['message' => 'Viaje con id ' . $travelId . ' tomado. Dando oportunidad para terminar limpiamente', 
                'travel_id' => $travelId, 'passenger_name' => $passengerName, 'code' => 105], JSON_UNESCAPED_UNICODE);
                echo "data: $data2\n\n";
                ob_flush();
                flush();
                sleep(1);
                $exitCounter++;
            }
            exit();
        });
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');
        
        return $response;
    }

    public function willMyTravelBeTaken(Request $request){
        $response = new StreamedResponse(function () use($request) {
            $travelId = -99;
            $passengerName = '';
            $driverName = '';
            $exitCounter = 0;
            define('SEEKSTARTEDAT', \Carbon\Carbon::now());
            while(true){
                try{
                    $travel = CurrentTravel::orderBy('created_at', 'desc')->where('passenger_id', $request->query('user_id'))->whereNull('deleted_at')->firstOrFail();
                    if($travel->is_taken == 1) {
                        $travelId = $travel->id;
                        $driverName = $travel->driver_name;
                        break;
                    } else {
                        $data = json_encode(['message' => 'Todavía ningún conductor ha tomado el viaje', 'code' => 80], JSON_UNESCAPED_UNICODE);
                        echo "data: $data\n\n";
                        ob_flush();
                        flush();
                        sleep(2);
                        $currentTime = \Carbon\Carbon::now();
                        $timeDiff = $currentTime->diffInMinutes(SEEKSTARTEDAT);
                        if($timeDiff>=1){
                            while($exitCounter<5){
                                $data3 = json_encode(['message' => 'Ningún conductor tomó el viaje. Rindiéndose y dando la oportunidad para terminar limpiamente', 'code' => 81], JSON_UNESCAPED_UNICODE);
                                echo "data: $data3\n\n";
                                ob_flush();
                                flush();
                                sleep(1);
                                $exitCounter++;
                            }
                            exit();
                        }

                    }
                } catch(Exception $e){
                    $data3 = json_encode(['message' => 'ERROR: ' . $e->getMessage(), 'code' => 255]);
                    echo "data: $data3\n\n";
                    ob_flush();
                    flush();
                    exit();
                }
            }
            while($exitCounter < 5) {
                $data2 = json_encode(['message' => 'Viaje con id ' . $travelId . ' tomado. Dando oportunidad para terminar limpiamente', 
                'travel_id' => $travelId , 'driver_name'=> $driverName, 'code' => 105], JSON_UNESCAPED_UNICODE);
                echo "data: $data2\n\n";
                ob_flush();
                flush();
                sleep(1);
                $exitCounter++;
            }
            exit();
        }
        );
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');
        
        return $response;
    }

    public function monitorTravel(Request $request)
    {
        $travel = CurrentTravel::find($request->query('travel_id'));
        if (is_null($travel)) {
            return self::returnJSONBuilder(200, 'Error: Viaje con id ' . $request->query('travel_id') . ' no encontrado.', 255);
        }
        $response = new StreamedResponse(function() use($travel, $request){
            // $travelId = $travel->id;
            // $driverId = $travel->driver_id;
            // $passengerId= $travel->passenger_id;
            // $driverName = $travel->driver_name;
            // $passengerName = $travel->passsenger_name;
            // $isTaken = $travel->is_taken;
            // $startCoord = $travel->start_coordinates;
            //lorón
            // $tariffValue = $travel->tariff;
            $exitCounter = 0;
            while(true){
                // $data = json_encode(['message' => 'Viaje con id ' . $travel->id . ' en curso', 
                // 'data' => [
                //     'travel_id' => $travelId, 
                //     'driver_id' => $driverId,
                //     'driver_name' => $driverName,
                //     'is_taken' => $isTaken, 
                //     'passenger_id' => $passengerId,
                //     'passenger_name' => $passengerName,
                //     'tariff' => $tariffValue],
                // 'code' => 108,
                // ]);
                $data = $travel->toJson();
                echo "data: $data\n\n";
                ob_flush();
                flush();
                sleep(1);
                $travel = CurrentTravel::find($request->query('travel_id'));
                if (is_null($travel)) {
                    break;
                }
                $travelId = $travel->id;
                // $driverId = $travel->driver_id;
                // $passengerId= $travel->passenger_id;
                // $isTaken = $travel->is_taken;
            }
            while($exitCounter < 5){
                $data2 = json_encode(['message' => 'Viaje con id ' . $travelId . ' terminado. Dándo la oportunidad para terminar limpiamente',
                'data' => json_decode($data) ,'code' => 109
                ], JSON_UNESCAPED_UNICODE);
                echo "data: $data2\n\n";
                ob_flush();
                flush();
                sleep(1);
                $exitCounter++;
            }
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
                    // $travelHistoryUser = TravelHistory::create([
                    // 'user_id' => $request->user()->id, 
                    // 'from_coord' => $travel->start_coordinates, 
                    // 'to_coord' => json_encode($request->end_coordinates),
                    // 'transport_user' => UserData::where('user_id', '=', $travel->driver_id)->firstOrFail()->nombre,
                    // 'total_payment' => $request->total_payment,
                    // 'payment_type' => $request->payment_type]);
                    // $travelHistoryDriver = TravelHistory::create([
                    // 'user_id' => $travel->driver_id, 
                    // 'from_coord' => $travel->start_coordinates, 
                    // 'to_coord' => json_encode($request->end_coordinates),
                    // 'transport_user' => UserData::where('user_id', '=', $travel->driver_id)->firstOrFail()->nombre,
                    // 'total_payment' => $request->total_payment,
                    // 'payment_type' => $request->payment_type
                    // ]);
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
                    
                    // $travelHistoryUser = TravelHistory::create([
                    //     'user_id' => $request->user()->id, 
                    //     'from_coord' => $travel->start_coordinates, 
                    //     'to_coord' => json_encode($request->end_coordinates),
                    //     'transport_user' => UserData::where('user_id', '=', $travel->driver_id)->firstOrFail()->nombre,
                    //     'total_payment' => $request->total_payment,
                    //     'payment_type' => $request->payment_type]);
                    //     $travelHistoryDriver = TravelHistory::create([
                    //     'user_id' => $travel->user_id, 
                    //     'from_coord' => $travel->start_coordinates, 
                    //     'to_coord' => json_encode($request->end_coordinates),
                    //     'transport_user' => UserData::where('user_id', '=', $travel->passenger_id)->firstOrFail()->nombre,
                    //     'total_payment' => $request->total_payment,
                    //     'payment_type' => $request->payment_type
                    //     ]);
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
