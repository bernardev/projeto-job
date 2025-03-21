const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Registro de usuário
 */
exports.register = async (req, res) => {
    const { nome_usuario, email, telefone, senha } = req.body;

    try {
        // Verifica se o email já existe
        const sqlCheckEmail = "SELECT * FROM usuarios WHERE email = ?";
        db.query(sqlCheckEmail, [email], async (err, result) => {
            if (result.length > 0) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }

            // Hash da senha
            const hashSenha = await bcrypt.hash(senha, 10);

            // Insere o usuário no banco de dados
            const sqlInsert = "INSERT INTO usuarios (nome_usuario, email, telefone, senha) VALUES (?, ?, ?, ?)";
            db.query(sqlInsert, [nome_usuario, email, telefone, hashSenha], (err, result) => {
                if (err) return res.status(500).json({error: err.message});
                return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
            }
            );
        }
        );

    } catch (error) {
        return res.status(500).json({error: "Erro no servidor"});
    }
};

/**
 * Login de usuário
 */
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        if (result.length === 0) return res.status(401).json({ message: 'Email ou senha incorretos' });

        const usuario = result[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ error: "Senha inválida" });

        // Gerar token jwt
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token, message: "Login realizado com sucesso!"});
    });
};