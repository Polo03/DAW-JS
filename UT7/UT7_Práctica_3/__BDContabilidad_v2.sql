SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS CONTABILIDAD DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE CONTABILIDAD;


DROP TABLE IF EXISTS SALDOS;
DROP TABLE IF EXISTS CUENTAS;
DROP TABLE IF EXISTS GASTOS;
DROP TABLE IF EXISTS CONCEPTOS;



CREATE TABLE IF NOT EXISTS CONCEPTOS (
        id      int(11)          NOT NULL AUTO_INCREMENT,
        nombre  varchar(50)  CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO CONCEPTOS (id, nombre) VALUES
                                       (1, 'Agua'),
                                       (2, 'Luz'),
                                       (3, 'Gas'),
                                       (5, 'Guardería'),
                                       (6, 'Comida'),
                                       (7, 'Ropa'),
                                       (8, 'Gasolina'),
                                       (10, 'Transporte'),
                                       (14, 'Seguros'),
                                       (21, 'Internet'),
                                       (28, 'Hipoteca'),
                                       (38, 'Nómina'),
                                       (39, 'Otros_Ingresos'),
                                       (44, 'Ocio'),
                                       (46, 'Viajes')
;

CREATE TABLE IF NOT EXISTS GASTOS (
            Id              int(11)    NOT NULL AUTO_INCREMENT,
            Ingreso_gasto   varchar(7) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
            Valor           decimal(10,2) NOT NULL,
            Descripcion     varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
            Fecha           date        NOT NULL,
            Id_concepto     int(3)      NOT NULL,
        PRIMARY KEY (Id),
        KEY fk_conceptosIDIdx (Id_concepto),
        FOREIGN KEY (Id_concepto) REFERENCES CONCEPTOS (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO GASTOS (id, Ingreso_gasto, Valor, Descripcion, Fecha, Id_concepto) 
VALUES
    (1, 'Ingreso', 120.12 , 'Devolución', '2022/01/22', 39),
    (2, 'Ingreso', 1200.12 , 'Devolución', '2022/01/22', 38),
    (3, 'Gasto', -120.12 , 'GastoXX', '2022/11/01', 3),
    (3, 'Gasto', -50.12 , 'GastoXX', '2022/11/01', 6),
    (3, 'Gasto', -60.12 , 'GastoXX', '2022/10/01', 7),
    (3, 'Gasto', -70.12 , 'GastoXX', '2022/10/01', 8),
    (3, 'Gasto', -220.12 , 'GastoXX', '2022/10/01', 6),
    (3, 'Gasto', -90.12 , 'GastoXX', '2022/11/11', 7),
;

CREATE TABLE IF NOT EXISTS CUENTAS (
            id      int(11)         NOT NULL AUTO_INCREMENT,
            nombre  varchar(50)     CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO CUENTAS (id, nombre) VALUE  (1, 'BANCO-1'),
                                        (2,'BANCO-2')
;


CREATE TABLE IF NOT EXISTS SALDOS (
            Id              int(11)         NOT NULL AUTO_INCREMENT,
            cuentaId        int(11)         NOT NULL,
            Valor           decimal(10,2)   NOT NULL,
            Fecha           date            NOT NULL,
        PRIMARY KEY (Id),
        KEY fk_cuentaIDIdx (cuentaId),
        FOREIGN KEY (cuentaId) REFERENCES CUENTAS (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT into  SALDOS (id, cuentaId, Valor, Fecha) 
VALUES
    (1, 1, 1000, '2022/12/01'),
    (2, 1, 900, '2022/11/01'),
    (3, 2, 900, '2022/10/01')
;



COMMIT;