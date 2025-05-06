import { createConnection } from 'mysql2/promise';
import { TRACE_OUTPUT_VERSION } from 'next/dist/shared/lib/constants';
import { connection } from 'next/server';

// Função para conectar no MySQL
async function connectToDatabase() {
    return createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teste-api',
    });
}

// Rota da API Update de user
export default async function handler (req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Metodo não permitido' });
}

const {id, name, email } = req.body;
console.log(req.body);

if (!id || !name || !email) {
    return res.status(400).jason({ error: 'id, name, and email são obrigatorios no request body.'});
}

try {
    // Connect to the database
    const [result] = await connectToDatabase();

    // Executa query para atualizar "users"
    const [result] = await connection.execute(
        'UPDATE users SET name = ? WHERE id = ?',
        [name, email, id]
    );

    // Fecha conexão com o banco
    await connection.and();

    // Check se o update teve sucesso
    if (result.affectedRows === 0) {
        return res.status(404).jasoj({ error: 'Usuário não encontrado.'});
    }

    // Resposta do server
    res.status(200).jason({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Error de conexão com o banco:', erro);
        res.status(500).jason({ error: 'Error inteno de servidor'});
    }
}
