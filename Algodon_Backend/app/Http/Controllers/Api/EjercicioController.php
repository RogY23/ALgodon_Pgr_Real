<?php



namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ejercicio;


class EjercicioController extends Controller {
    public function index() // para mostrar todo
    {
        $ejercicios  = Ejercicio::All();
        return $ejercicios;

    }


    public function store(Request $request) // guardar
    {
        $ejercicio = New Ejercicio();
        $ejercicio->enunciado = $request->enunciado;
        $ejercicio->titulo = $request->titulo;
        $ejercicio->dificultad = $request->dificultad;

        $ejercicio->save();
    }


    public function show($id) // mostrar
    {
        $ejercicio = Ejercicio::find($id);
        return $ejercicio;
    }


    public function update(Request $request, $id) // Actualizar
    {
        $ejercicio = Ejercicio::findOrFail($request->id);
        $ejercicio->titulo = $request->titulo;
        $ejercicio->enunciado = $request->enunciado;
        $ejercicio->dificultad = $request->dificultad;
        $ejercicio->save();

        return $ejercicio;
    }


    public function delete($id) // eliminar
    {
        $ejercicio = Ejercicio::destroy($id);
        return $ejercicio;
    }



}
