const bikeRoutes = [
  {
    id: 1,
    title: "Desafio na Serra do Rio do Rastro - SC",
    image: "https://images.pexels.com/photos/30352730/pexels-photo-30352730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Estrada sinuosa em meio à serra catarinense. Percurso exigente com paisagens deslumbrantes, ideal para ciclistas experientes.",
    duration: 210,
    distance: 24,
    rating: 4.8,
    average_speed: 6.9
  },
  {
    id: 2,
    title: "Cicloturismo na Rota do Vinho - SP",
    image: "https://images.pexels.com/photos/31561191/pexels-photo-31561191/free-photo-of-fileiras-de-vinhedos-exuberantes-sob-um-ceu-azul-claro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Passeio agradável entre vinícolas e colinas suaves em São Roque. Ideal para quem curte um pedal com paradas gastronômicas.",
    duration: 150,
    distance: 18,
    rating: 4.6,
    average_speed: 7.2
  },
  {
    id: 3,
    title: "Costa do Descobrimento - Bahia",
    image: "https://images.pexels.com/photos/31569973/pexels-photo-31569973/free-photo-of-baia-de-todos-os-santos.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Rota costeira com belas praias, falésias e vilas históricas. Recomendado para ciclistas intermediários.",
    duration: 240,
    distance: 35,
    rating: 4.7,
    average_speed: 8.8
  },
  {
    id: 4,
    title: "Chapada Diamantina Selvagem - BA",
    image: "https://images.pexels.com/photos/19238829/pexels-photo-19238829/free-photo-of-montanhas-homem-caminhando-andando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Trilha técnica e desafiadora no coração da Chapada. Terreno misto com subidas e descidas intensas.",
    duration: 300,
    distance: 30,
    rating: 4.9,
    average_speed: 6.0
  },
  {
    id: 5,
    title: "Beira Rio Guaíba - Porto Alegre",
    image: "https://images.pexels.com/photos/544292/pexels-photo-544292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Rota urbana e tranquila ao redor do lago Guaíba. Ideal para iniciantes e passeios em família.",
    duration: 90,
    distance: 12,
    rating: 4.5,
    average_speed: 8.0
  },
  {
    id: 6,
    title: "Circuito das Águas - Minas",
    image: "https://images.pexels.com/photos/3996439/pexels-photo-3996439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Rota entre estâncias hidrominerais e matas de Minas. Subidas leves e boa estrutura para cicloturistas.",
    duration: 180,
    distance: 25,
    rating: 4.3,
    average_speed: 8.3
  },
  {
    id: 7,
    title: "Praias Selvagens do Rio - Rio de Janeiro",
    image: "https://images.pexels.com/photos/17299048/pexels-photo-17299048/free-photo-of-mar-praia-litoral-ferias.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Trilha off-road até praias isoladas do Rio de Janeiro. Exige condicionamento e bike apropriada.",
    duration: 120,
    distance: 15,
    rating: 4.6,
    average_speed: 7.5
  },
  {
    id: 8,
    title: "Estrada Parque Pantanal - MS",
    image: "https://images.pexels.com/photos/18731467/pexels-photo-18731467/free-photo-of-estrada-via-panorama-vista.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Percurso plano em estrada de terra cercado por vida selvagem. Ideal para quem busca contato com a natureza.",
    duration: 270,
    distance: 40,
    rating: 4.7,
    average_speed: 8.9
  },
  {
    id: 9,
    title: "Volta à Ilha de Fernando de Noronha - Pernambuco",
    image: "https://images.pexels.com/photos/19421782/pexels-photo-19421782/free-photo-of-baia-do-sancho-em-fernando-de-noronha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Roteiro curto, porém intenso, com paisagens paradisíacas. Estrada asfaltada e trilhas com alto grau de beleza cênica.",
    duration: 120,
    distance: 14,
    rating: 4.9,
    average_speed: 7.0
  },
  {
    id: 10,
    title: "Pedal no Sertão do Cariri - CE",
    image: "https://images.pexels.com/photos/13799203/pexels-photo-13799203.jpeg",
    description: "Percurso em meio à caatinga e formações rochosas. Exige hidratação e preparo, com forte apelo cultural e histórico.",
    duration: 240,
    distance: 28,
    rating: 4.4,
    average_speed: 7.0
  },
  {
    id: 11,
    title: "Desafio na Serra do Rio do Rastro - SC",
    image: "https://images.pexels.com/photos/30352730/pexels-photo-30352730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Estrada sinuosa em meio à serra catarinense. Percurso exigente com paisagens deslumbrantes, ideal para ciclistas experientes.",
    duration: 210,
    distance: 24,
    rating: 4.8,
    average_speed: 6.9
  },
  {
    id: 12,
    title: "Cicloturismo na Rota do Vinho - SP",
    image: "https://images.pexels.com/photos/31561191/pexels-photo-31561191/free-photo-of-fileiras-de-vinhedos-exuberantes-sob-um-ceu-azul-claro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Passeio agradável entre vinícolas e colinas suaves em São Roque. Ideal para quem curte um pedal com paradas gastronômicas.",
    duration: 150,
    distance: 18,
    rating: 4.6,
    average_speed: 7.2
  },
  {
    id: 13,
    title: "Costa do Descobrimento - Bahia",
    image: "https://images.pexels.com/photos/31569973/pexels-photo-31569973/free-photo-of-baia-de-todos-os-santos.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Rota costeira com belas praias, falésias e vilas históricas. Recomendado para ciclistas intermediários.",
    duration: 240,
    distance: 35,
    rating: 4.7,
    average_speed: 8.8
  },
  {
    id: 14,
    title: "Chapada Diamantina Selvagem - BA",
    image: "https://images.pexels.com/photos/19238829/pexels-photo-19238829/free-photo-of-montanhas-homem-caminhando-andando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Trilha técnica e desafiadora no coração da Chapada. Terreno misto com subidas e descidas intensas.",
    duration: 300,
    distance: 30,
    rating: 4.9,
    average_speed: 6.0
  },
];


export default bikeRoutes;