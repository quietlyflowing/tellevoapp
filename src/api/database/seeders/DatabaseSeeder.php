<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);'

        $mails = [
            ['nombre' => 'Juán Pérez Gonzalez', 'correo_electronico' => 'ju.perezg@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Daniela Ibañez Díaz', 'correo_electronico' => 'da.ibanezd@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Miguel García López', 'correo_electronico' => 'mi.garcial@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Ana Martínez Ruiz', 'correo_electronico' => 'an.martinezr@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Carlos Rodríguez Sánchez', 'correo_electronico' => 'ca.rodriguezs@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Isabel Fernández García', 'correo_electronico' => 'is.fernandezg@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Antonio López Martínez', 'correo_electronico' => 'an.lopezm@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Sofía Pérez Rodríguez', 'correo_electronico' => 'so.perezr@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Javier Ruiz García', 'correo_electronico' => 'ja.ruizg@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Laura Sánchez López', 'correo_electronico' => 'la.sanchezl@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Pedro Díaz Martínez', 'correo_electronico' => 'pe.diazm@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Carmen García Rodríguez', 'correo_electronico' => 'ca.garciar@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Francisco López Sánchez', 'correo_electronico' => 'fr.lopezs@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Elena Martínez Pérez', 'correo_electronico' => 'el.martinezp@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['nombre' => 'Manuel Rodríguez Fernández', 'correo_electronico' => 'ma.rodriguezf@duocuc.cl', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
        ];
        DB::table('duoc_mails')->insert($mails);

        $user = [
            [
                'id' => 1,
                'email' => 'du.mmy@duocuc.cl',
                'password' => '$2y$10$lRHG.EfczKprn4ZzhDoC2OLOEfH0MQ5U2G/l8wxGJRAEEjbE.7sAG',
                'IS_DRIVER' => 0,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ],
            [
                'id' => 2,
                'email' => 'te.st@duocuc.cl',
                'password' => '$2y$10$kPHHExvqmQKUiJ9.2gs7iOgv3TWF4ifu.tP3qsz3A4fmPgRI1dsVm',
                'IS_DRIVER' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]
        ];

        DB::table('users')->insert($user);
        //user: du.mmy@duocuc.cl pass: dummypass
        //pass: te.st@duocuc.cl pass: testpassword

        $api_key = ['id' => 1, 'key' => 'rF2c3SnDAgQisoh6Pk72mwA41RD7G34ELVpN55Jsit7C8YNzMI', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()];
        DB::table('api_keys')->insert($api_key);

        $user_data = [
            // ['user_id' => 1, 'nombre' => 'Dummy User', 'telefono' => '912345678', 'direccion_hogar' => 'Leonardo Da Vinci 4903, Maipú', 'cord_hogar' => json_encode(['cord_x' => -33.47623, 'cord_y' => -70.74753]), 'direccion_duoc'=> 'Esquina Blanca 501, Maipú', 'cord_duoc' => json_encode(['cord_x' => -33.51190, 'cord_y' => -70.75276]) , 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            // ['user_id' => 2, 'nombre' => 'Test User', 'telefono' => '913248667', 'direción_hogar' => 'Pasaje Picaflor, Maipú' , 'cord_hogar'=> json_encode(['cord_x' => -33.47150, 'cord_y' => -70.74665]), 'direccion_duoc'=> 'Esquina Blanca 501, Maipú', 'cord_duoc' => json_encode(['cord_x' => -33.51190, 'cord_y' => -70.75276]),'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()]
            ['user_id' => 1, 'nombre' => 'Dummy User', 'telefono' => '912345678', 'direccion_hogar' => 'Leonardo Da Vinci 4903, Maipú', 'direccion_duoc' => 'Esquina Blanca 501, Maipú',  'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()],
            ['user_id' => 2, 'nombre' => 'Test User', 'telefono' => '913248667', 'direción_hogar' => 'Pasaje Picaflor, Maipú', 'direccion_duoc' => 'Esquina Blanca 501, Maipú', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()]
        ];
        DB::table('users_data')->insert($user_data);

        $vehicles = [
            ['user_id' => 2, 'patente' => 'DNFK58', 'modelo' => 'Toyota Yaris', 'año' => 2019, 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()]
        ];
        DB::table('vehicles')->insert($vehicles);

        $history = [
            ['user_id' => 1, 'from_coord' => json_encode(['address'=> 'Las Palomas de San José 421', 'cord_x' => -33.47623, 'cord_y' => -70.74753]), 'to_coord' => json_encode(['address'=> 'Esquina Blanca 501', 'cord_x' => -33.51190, 'cord_y' => -70.75276]), 'payment_type' => 1, 'total_payment' => 8500, 'transport_user' => 'Test User', 'created_at' => \Carbon\Carbon::create(2023, 10, 10, 10, 30, 50, 'America/Santiago'), 'updated_at' => \Carbon\Carbon::create(2023, 10, 10, 10, 30, 50, 'America/Santiago'),],
            ['user_id' => 1, 'from_coord' => json_encode(['address'=> 'Esquina Blanca 501', 'cord_x' => -33.51190, 'cord_y' => -70.75276]), 'to_coord' => json_encode(['address'=> 'Las Palomas de San José 421', 'cord_x' => -33.47623, 'cord_y' => -70.74753]), 'payment_type' => 1, 'total_payment' => 8500, 'transport_user' => 'Test User','created_at' => \Carbon\Carbon::create(2023, 10, 10, 18, 23, 34, 'America/Santiago'), 'updated_at' => \Carbon\Carbon::create(2023, 10, 10, 18, 23, 34, 'America/Santiago')],
            ['user_id' => 2, 'from_coord' => json_encode(['address'=> 'Las Palomas de San José 421', 'cord_x' => -33.47623, 'cord_y' => -70.74753]), 'to_coord' => json_encode(['address'=> 'Esquina Blanca 501', 'cord_x' => -33.51190, 'cord_y' => -70.75276]), 'payment_type' => 1, 'total_payment' => 8500, 'transport_user' => 'Dummy User','created_at' => \Carbon\Carbon::create(2023, 10, 10, 10, 30, 50, 'America/Santiago'), 'updated_at' => \Carbon\Carbon::create(2023, 10, 10, 10, 30, 50, 'America/Santiago'),],
            ['user_id' => 2, 'from_coord' => json_encode(['address'=> 'Esquina Blanca 501', 'cord_x' => -33.51190, 'cord_y' => -70.75276]), 'to_coord' => json_encode(['address'=> 'Las Palomas de San José 421', 'cord_x' => -33.47623, 'cord_y' => -70.74753]), 'payment_type' => 1, 'total_payment' => 8500,'transport_user' => 'Dummy User','created_at' => \Carbon\Carbon::create(2023, 10, 10, 18, 23, 34, 'America/Santiago'), 'updated_at' => \Carbon\Carbon::create(2023, 10, 10, 18, 23, 34, 'America/Santiago')],
                
        ];
        DB::table('travel_history')->insert($history);

        $questions = [
            ['user_id' => 1, 'question' => 4, 'answer' => 'Interstellar'],
            ['user_id' => 2, 'question' => 0, 'answer' => 'Jorge'],
        ];
        DB::table('secret_questions')->insert($questions);
    }
}
