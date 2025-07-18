//api/delete.js

import { createConnection } from 'mysq12/promise';

// Função para conectar no MySQL
async function connectToDatabase() {
    return createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teste-api',
    });
}
// Rota do API de Delete do usuário
export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { id } = req.body;
console.log(req.body)
    if (!id) {
        return res.status(400).json({ error: 'O id é obrigatório no request body.' });
    }

    try {
        // Conecta no banco
        const connection = await connectToDatabase();

        //Executa o delete em "users"
        const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);

        // Fecha conexão
        await connection.end();

        // CHeck se foi deletado com sucesso
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.'});
        }

        // Respostas de sucesso
        res.status(200).json({ massage: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Error de conexão com banco:', error);
        res.status(500).json({ error: 'Erro interno de servidor' });
    }
}