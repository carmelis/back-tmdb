const { Users } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userConfig = require("../config/user");

module.exports = {
  //login
  sigIn: (req, res) => {
    let { email, password } = req.body;

    //buscar usuario
    Users.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ msg: "Usuario con este correo no encontrado" });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            //creamos el token
            let token = jwt.sign({ user: user }, userConfig.secret, {
              expiresIn: userConfig.expires,
            });

            res.json({
              user: user,
              token: token,
            });
          } else {
            //autorized access
            res.status(401).json({ msg: "Contraseña incorrecta" });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //registro
  sigUp: (req, res) => {
    //encriptamos la contraseña
    let password = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(userConfig.rounds)
    );

    //crear un usuario
    Users.create({
      username: req.body.username,
      email: req.body.email,
      password: password,
    })
      .then((user) => {
        //creamos el token
        let token = jwt.sign({ user: user }, userConfig.secret, {
          expiresIn: userConfig.expires,
        });

        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  AddtoFavs: (req, res) => {
    const { id, title, description, imageUrl } = req.body;
    Users.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      user.favoritos.push(req.body);
      Users.update({ favoritos: user.favoritos }, { where: { id: id } });
      res.json({
        movieId: req.body,
      });
    });
  },
  getFavorites: (req, res) => {
    const { id } = req.params;
    console.log(id);
    Users.findOne({
      where: {
        id: id,
      },
    }).then((user) => {
      res.json({ favoritos: user.favoritos });
    });
  },
};
