const express = require('express');
const router = express.Router();

const Vendedor = require('../models/Vendedor')

//Ruta para obtener todos los vendedores
router.get('/', async (req, res) => {
    try {
        const vendedores = await Vendedor.find(); // metodo buscar
        res.json(vendedores);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener vendedores'
        })
    }
});

// Logica para crear un NUEVO vendedor
router.post('/', async (req, res) => {
    try {
        const nuevoVendedor = new Vendedor(req.body);
        await nuevoVendedor.save(); // es una promesa, esperar a que la promesa termine para guardar nuevo vendedor
        res.json(nuevoVendedor);
    } catch (error) {
        res.status(500).json({
            error: 'Error al crear vendedor'
        })
    }
});

// ruta para modificar o actualizarun registro
router.put('/:id', async (req, res) => {
    try {
        const vendedor = await Vendedor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar el vendedor'
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Vendedor.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Vendedor eliminado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            error: 'No se pudo eliminar el vendedor'
        })
    }
});


module.exports = router;