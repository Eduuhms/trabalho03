const axios = require('axios');

const API_URL = 'http://localhost:3000/api';


async function main() {
  const email = 'cliente@demo.com';
  const username = 'cliente';
  try {
    // 1. Registro de usuário
    console.log('\n');
    console.log('Registrando usuário...');
    const registerResp = await axios.post(`${API_URL}/auth/register`, {
      email,
      username,
      password: '123456',
      firstName: 'Demo',
      lastName: 'Cliente'
    });
  console.log('Usuário registrado:', registerResp.data.data.user.email);
  console.log('\n');

  } catch (e) {
    if (e.response && e.response.status === 400) {
  console.log('Usuário já registrado, continuando...');
  console.log('\n');
    } else {
      throw e;
    }
  }

  // 2. Login
  console.log('Logando...');
  const loginResp = await axios.post(`${API_URL}/auth/login`, {
    identifier: email,
    password: '123456'
  });
  const token = loginResp.data.data.token;
  console.log('Token JWT:', token);
  console.log('\n');


  // 3. Busca de itens
  console.log('Buscando itens com nome "arroz"...');
  const searchResp = await axios.get(`${API_URL}/items?name=arroz`);
  const items = searchResp.data.data;
  console.log('Itens encontrados:', items.map(i => i.name));
  console.log('\n');

  // 4. Criação de lista
  console.log('Criando lista de compras...');
  const listResp = await axios.post(`${API_URL}/lists`, {
    name: 'Minha Lista',
    description: 'Lista de teste'
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const list = listResp.data.data;
  console.log('Lista criada:', list.name, 'Id da lista:', list.id);
  console.log('\n');

  // 5. Adição de itens à lista
  if (items.length > 0) {
    console.log('Adicionando item à lista...');
    const addItemResp = await axios.post(`${API_URL}/lists/${list.id}/items`, {
      itemId: items[0].id,
      quantity: 2
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  console.log('Item adicionado:', addItemResp.data.data.items[0].itemName);
  console.log('\n');
  } else {
  console.log('Nenhum item "arroz" encontrado para adicionar.');
  console.log('\n');
  }

  // 6. Visualização do dashboard
  console.log('Consultando dashboard...');
  const dashResp = await axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Dashboard:', JSON.stringify(dashResp.data.data, null, 2));
  console.log('\n');
}

main().catch(err => {
  if (err.response) {
    console.error('Erro:', err.response.status, err.response.data);
  } else {
    console.error('Erro:', err.message);
  }
});
