// import expressjs
const express = require('express');

// define router
const router = express.Router();
const axios = require('axios')

// Import sesi pengguna
router.get('/user', (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            message: 'User session retrieved',
            data: req.session.user,
        });
    } else {
        res.status(400).json({
            message: 'User session not found',
        });
    }
});


// Config Defaults Axios dengan Detail Akun Rajaongkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter'
axios.defaults.headers.common['key'] = '9e1ab3d85e05ad30fe688b392c73361f'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Router GET province
router.get('/provinsi', (req, res) => {
  axios.get('/province')
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

// Router GET city by province_id
router.get('/kota/:provId', (req, res) => {
  const id = req.params.provId
  axios.get(`/city?province=${id}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

// Router GET costs
router.get('/ongkos/:asal/:tujuan/:berat/:kurir', (req, res) => {
  const param = req.params
  axios.post('/cost', {
      origin: param.asal,
      destination: param.tujuan,
      weight: param.berat,
      courier: param.kurir
    })
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})
  
module.exports = router;
