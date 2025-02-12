<?php

abstract class Dato
{
}

trait Identificable
{
    protected int $id;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }
}

class Concepto extends Dato implements JsonSerializable
{
    use Identificable;

    private string $nombre;
    private ?array $gastosPertenecientes = null;

    public function __construct(int $id, string $nombre)
    {
        $this->id = $id;
        $this->setNombre($nombre);
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
        ];

        // Esto sería lo mismo:
        //$array["nombre"] = $this->nombre;
        //$array["id"] = $this->id;
        //return $array;
    }

    public function eliminar(): bool {
        // Esto sería un control para NO eliminar una categoría si "contiene" personas.
        if ($this->obtenerGastosPertenecientes()) return false;

        return DAO::conceptoEliminarPorId($this->id);
    }

    public function obtenerGastosPertenecientes(): array
    {
        if ($this->gastosPertenecientes == null) $gastosPertenecientes = DAO::gastosObtenerPorConcepto($this->id);

        return $gastosPertenecientes;
    }
}

class Gasto extends Dato implements JsonSerializable
{
    use Identificable;

    private string $ingreso_gasto;
    private float $valor;
    private string $descripcion;
    private string $fecha;
    private int $conceptoId;
    private ?Concepto $concepto = null;

    public function __construct(int $id, string $ingreso_gasto, string $valor, string $descripcion, string $fecha, int $conceptoId)
    {
        $this->id = $id;
        $this->ingreso_gasto = $ingreso_gasto;
        $this->valor = $valor;
        $this->descripcion = $descripcion;
        $this->fecha = $fecha;
        $this->conceptoId = $conceptoId;
    }

    public function getDescripcion(): string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): void
    {
        $this->descripcion = $descripcion;
    }

    public function getIngreso_gastos(): string
    {
        return $this->ingreso_gastos;
    }

    public function setIngreso_gasto(string $ingreso_gastos): void
    {
        $this->ingreso_gastos = $ingreso_gastos;
    }

    public function getValor(): float
    {
        return $this->valor;
    }

    public function setValor(float $valor): void
    {
        $this->valor = $valor;
    }

    public function getFecha(): string
    {
        return $this->fecha;
    }

    public function setFecha(string $fecha): void
    {
        $this->fecha = $fecha;
    }

    public function getConcpetoId(): int
    {
        return $this->conceptoId;
    }

    public function setConceptoId(int $conceptoId): void
    {
        $this->conceptoId = $conceptoId;
    }

    public function jsonSerialize()
    {
        return [
            "Id" => $this->id,
            "Ingreso_gasto" => $this->ingreso_gasto,
            "Valor" => $this->valor,
            "Descripcion" => $this->descripcion,
            "Fecha" => $this->fecha,
            "Id_concepto" => $this->conceptoId,
        ];

        // Esto sería lo mismo:
        //$array["nombre"] = $this->nombre;
        //$array["id"] = $this->id;
        //return $array;
    }

    public function obtenerConcepto(): Concepto
    {
        if ($this->concepto == null) $concepto = DAO::conceptoObtenerPorId($this->conceptoId);

        return $concepto;
    }

    public function perteneceA(Concepto $concepto): bool
    {
        return ($this->conceptoId == $concepto->getId());
    }
}