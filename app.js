const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});
app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const niveles = Array.isArray(req.body.nivel) ? req.body.nivel : [req.body.nivel]; 
    const medioPago = req.body.medioPago;
    let costoTotal = 0;
    const costoPorCurso = {
        'Java': 1200,
        'PHP': 800,
        '.NET': 1500,
    };
    niveles.forEach(function(nivelSeleccionado) {
        costoTotal += costoPorCurso[curso] || 0;
    });
    if (medioPago === 'Pago en efectivo') {
        costoTotal *= 0.9; 
    }
    res.render('confirmacion', { curso, niveles, medioPago, costoTotal });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});