DROP TABLE IF EXISTS viaje;
DROP TABLE IF EXISTS pago;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nombre TEXT (255) NOT NULL,
	correo_electronico TEXT(255) NOT NULL,
	contrasena TEXT(255) NOT NULL,
	created_at TEXT(50) NOT NULL,
	updated_at TEXT(50),
	mail_confirmed_at TEXT(50)
);

CREATE TABLE pago (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	tarifa_viaje INTEGER NOT NULL,
	cargo_fijo INTEGER NOT NULL,
	total INTEGER NOT NULL,
	pagado_en TEXT NOT NULL
);

CREATE TABLE viaje (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	usuario_id INTEGER NOT NULL,
	conductor_id INTEGER NOT NULL,
	cord_inicio TEXT(100) NOT NULL,
	cord_termino text(100) NOT NULL,
	KM_TOTAL integer NOT NULL,
	started_at TEXT(50) NOT NULL,
	ended_at TEXT(50) NOT NULL,
	created_at TEXT(50) NOT NULL,
	updated_at TEXT(50) NOT NULL,
	pago_id INTEGER,
	CONSTRAINT FK_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_conductor FOREIGN KEY (conductor_id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_pago FOREIGN KEY (pago_id) REFERENCES pago (id) ON DELETE CASCADE ON UPDATE CASCADE
);
