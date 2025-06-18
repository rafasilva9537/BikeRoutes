using BikeRoutesApi.Data;
using BikeRoutesApi.Entities;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace BikeRoutesApi.Startup;

public static class DatabaseStartup
{
    public static void UseDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<BikeRoutesDbContext>();

        dbContext.Database.Migrate();
        
        if (!dbContext.Users.Any())
        {
            SeedDatabase(dbContext);
        }
    }
    
    public static void SeedDatabase(BikeRoutesDbContext dbContext)
    {
        var seedTransaction = dbContext.Database.BeginTransaction();
        
        List<User> users = [
            new() 
            {
                FirstName = "Marcos",
                LastName = "Nunes", 
                Email = "marcos@email.com",
                Phone = "61999999990",
                Photo = "https://images.pexels.com/photos/31630200/pexels-photo-31630200/free-photo-of-gato-preto-e-branco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new() 
            {
                FirstName = "Ana",
                LastName = "Silva",
                Email = "ana.silva@email.com", 
                Phone = "61999999991",
                Photo = "https://images.pexels.com/photos/731564/pexels-photo-731564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new() 
            {
                FirstName = "João",
                LastName = "Ferreira",
                Email = "joao.ferreira@email.com",
                Phone = "61999999992",
                Photo = "https://images.pexels.com/photos/31644561/pexels-photo-31644561/free-photo-of-luzes-a-noite-no-japao.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new() 
            {
                FirstName = "Beatriz",
                LastName = "Rocha",
                Email = "beatriz.rocha@email.com",
                Phone = "61999999993",
                Photo = "https://images.pexels.com/photos/31613570/pexels-photo-31613570/free-photo-of-retrato-caprichoso-em-um-campo-de-flores-encantador.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new() 
            {
                FirstName = "Lucas",
                LastName = "Mendes",
                Email = "lucas.mendes@email.com",
                Phone = "61999999994",
                Photo = "https://images.pexels.com/photos/31615928/pexels-photo-31615928/free-photo-of-andar-de.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new() 
            {
                FirstName = "Carla", 
                LastName = "Almeida",
                Email = "carla.almeida@email.com",
                Phone = "61999999995",
                Photo = "https://images.pexels.com/photos/31612073/pexels-photo-31612073/free-photo-of-idoso-aproveita-vista-da-praia-com-bicicleta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }
        ];
        
        List<BikeRoute> bikeRoutes = [
            new() 
            {
                UserId = 1,
                Title = "Desafio na Serra do Rio do Rastro - SC",
                Image = "https://images.pexels.com/photos/30352730/pexels-photo-30352730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Estrada sinuosa em meio à serra catarinense. Percurso exigente com paisagens deslumbrantes, ideal para ciclistas experientes.",
                Duration = 210,
                Distance = 24,
                Rating = 4.8,
                AverageSpeed = 6.9,
                StartPath = new Point(-28.3955, -49.3161),
                EndPath = new Point(-28.3970, -49.3157),
                CreatedAt = new DateTimeOffset(2025, 01, 01, 10, 30, 45, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 01, 03, 14, 45, 30, TimeSpan.Zero)
            },
            new()
            {
                UserId = 2,
                Title = "Cicloturismo na Rota do Vinho - SP",
                Image = "https://images.pexels.com/photos/31561191/pexels-photo-31561191/free-photo-of-fileiras-de-vinhedos-exuberantes-sob-um-ceu-azul-claro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Passeio agradável entre vinícolas e colinas suaves em São Roque. Ideal para quem curte um pedal com paradas gastronômicas.",
                Duration = 150,
                Distance = 18,
                Rating = 4.6,
                AverageSpeed = 7.2,
                StartPath = new Point(-23.5284, -47.1362),
                EndPath = new Point(-23.5298, -47.1353),
                CreatedAt = new DateTimeOffset(2025, 01, 15, 09, 15, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 01, 15, 09, 15, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 3,
                Title = "Costa do Descobrimento - Bahia",
                Image = "https://images.pexels.com/photos/31569973/pexels-photo-31569973/free-photo-of-baia-de-todos-os-santos.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Rota costeira com belas praias, falésias e vilas históricas. Recomendado para ciclistas intermediários.",
                Duration = 240,
                Distance = 35,
                Rating = 4.7,
                AverageSpeed = 8.8,
                StartPath = new Point(-16.4145, -39.0650),
                EndPath = new Point(-16.4138, -39.0670),
                CreatedAt = new DateTimeOffset(2025, 02, 01, 08, 45, 15, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 02, 01, 08, 45, 15, TimeSpan.Zero)
            },
            new()
            {
                UserId = 4,
                Title = "Chapada Diamantina Selvagem - BA",
                Image = "https://images.pexels.com/photos/19238829/pexels-photo-19238829/free-photo-of-montanhas-homem-caminhando-andando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Trilha técnica e desafiadora no coração da Chapada. Terreno misto com subidas e descidas intensas.",
                Duration = 300,
                Distance = 30,
                Rating = 4.9,
                AverageSpeed = 6.0,
                StartPath = new Point(-12.4708, -41.6078),
                EndPath = new Point(-12.4722, -41.6095),
                CreatedAt = new DateTimeOffset(2025, 02, 15, 14, 30, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 02, 16, 12, 20, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 5,
                Title = "Beira Rio Guaíba - Porto Alegre",
                Image = "https://images.pexels.com/photos/544292/pexels-photo-544292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Rota urbana e tranquila ao redor do lago Guaíba. Ideal para iniciantes e passeios em família.",
                Duration = 90,
                Distance = 12,
                Rating = 4.5,
                AverageSpeed = 8.0,
                StartPath = new Point(-30.0346, -51.2177),
                EndPath = new Point(-30.0359, -51.2195),
                CreatedAt = new DateTimeOffset(2025, 03, 01, 07, 00, 45, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 03, 01, 07, 00, 45, TimeSpan.Zero)
            },
            new()
            {
                UserId = 6,
                Title = "Circuito das Águas - Minas",
                Image = "https://images.pexels.com/photos/3996439/pexels-photo-3996439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Rota entre estâncias hidrominerais e matas de Minas. Subidas leves e boa estrutura para cicloturistas.",
                Duration = 180,
                Distance = 25,
                Rating = 4.3,
                AverageSpeed = 8.3,
                StartPath = new Point(-22.2484, -45.6960),
                EndPath = new Point(-22.2498, -45.6975),
                CreatedAt = new DateTimeOffset(2025, 03, 15, 16, 45, 30, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 03, 16, 10, 20, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 1,
                Title = "Praias Selvagens do Rio - RJ",
                Image = "https://images.pexels.com/photos/17299048/pexels-photo-17299048/free-photo-of-mar-praia-litoral-ferias.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Trilha off-road até praias isoladas do Rio de Janeiro. Exige condicionamento e bike apropriada.",
                Duration = 120,
                Distance = 15,
                Rating = 4.6,
                AverageSpeed = 7.5,
                StartPath = new Point(-23.0323, -43.5536),
                EndPath = new Point(-23.0345, -43.5561),
                CreatedAt = new DateTimeOffset(2025, 04, 01, 12, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 04, 01, 12, 00, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 2,
                Title = "Estrada Parque Pantanal - MS",
                Image = "https://images.pexels.com/photos/18731467/pexels-photo-18731467/free-photo-of-estrada-via-panorama-vista.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Percurso plano em estrada de terra cercado por vida selvagem. Ideal para quem busca contato com a natureza.",
                Duration = 270,
                Distance = 40,
                Rating = 4.7,
                AverageSpeed = 8.9,
                StartPath = new Point(-19.5511, -56.7072),
                EndPath = new Point(-19.5523, -56.7058),
                CreatedAt = new DateTimeOffset(2025, 04, 15, 10, 15, 45, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 04, 15, 10, 30, 30, TimeSpan.Zero)
            },
            new()
            {
                UserId = 3,
                Title = "Volta à Ilha de Fernando de Noronha - Pernambuco",
                Image = "https://images.pexels.com/photos/19421782/pexels-photo-19421782/free-photo-of-baia-do-sancho-em-fernando-de-noronha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Roteiro curto, porém intenso, com paisagens paradisíacas. Estrada asfaltada e trilhas com alto grau de beleza cênica.",
                Duration = 120,
                Distance = 14,
                Rating = 4.9,
                AverageSpeed = 7.0,
                StartPath = new Point(-3.8431, -32.4233),
                EndPath = new Point(-3.8425, -32.4250),
                CreatedAt = new DateTimeOffset(2025, 06, 01, 18, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 06, 01, 22, 30, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 4,
                Title = "Pedal no Sertão do Cariri - CE",
                Image = "https://images.pexels.com/photos/13799203/pexels-photo-13799203.jpeg",
                Description = "Percurso em meio à caatinga e formações rochosas. Exige hidratação e preparo, com forte apelo cultural e histórico.",
                Duration = 240,
                Distance = 28,
                Rating = 4.4,
                AverageSpeed = 7.0,
                StartPath = new Point(-7.2929, -39.3155),
                EndPath = new Point(-7.2940, -39.3171),
                CreatedAt = new DateTimeOffset(2025, 06, 16, 07, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 06, 16, 07, 15, 30, TimeSpan.Zero)
            },
            new()
            {
                UserId = 5,
                Title = "Desafio na Serra do Rio do Rastro - SC",
                Image = "https://images.pexels.com/photos/30352730/pexels-photo-30352730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Estrada sinuosa em meio à serra catarinense. Percurso exigente com paisagens deslumbrantes, ideal para ciclistas experientes.",
                Duration = 210,
                Distance = 24,
                Rating = 4.8,
                AverageSpeed = 6.9,
                StartPath = new Point(-28.3955, -49.3161),
                EndPath = new Point(-28.3970, -49.3157),
                CreatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 6,
                Title = "Cicloturismo na Rota do Vinho - SP",
                Image = "https://images.pexels.com/photos/31561191/pexels-photo-31561191/free-photo-of-fileiras-de-vinhedos-exuberantes-sob-um-ceu-azul-claro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Passeio agradável entre vinícolas e colinas suaves em São Roque. Ideal para quem curte um pedal com paradas gastronômicas.",
                Duration = 150,
                Distance = 18,
                Rating = 4.6,
                AverageSpeed = 7.2,
                StartPath = new Point(-23.5284, -47.1362),
                EndPath = new Point(-23.5298, -47.1353),
                CreatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 1,
                Title = "Costa do Descobrimento - Bahia",
                Image = "https://images.pexels.com/photos/31569973/pexels-photo-31569973/free-photo-of-baia-de-todos-os-santos.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Rota costeira com belas praias, falésias e vilas históricas. Recomendado para ciclistas intermediários.",
                Duration = 240,
                Distance = 35,
                Rating = 4.7,
                AverageSpeed = 8.8,
                StartPath = new Point(-16.4145, -39.0650),
                EndPath = new Point(-16.4138, -39.0670),
                CreatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero)
            },
            new()
            {
                UserId = 2,
                Title = "Chapada Diamantina Selvagem - BA",
                Image = "https://images.pexels.com/photos/19238829/pexels-photo-19238829/free-photo-of-montanhas-homem-caminhando-andando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                Description = "Trilha técnica e desafiadora no coração da Chapada. Terreno misto com subidas e descidas intensas.",
                Duration = 300,
                Distance = 30,
                Rating = 4.9,
                AverageSpeed = 6.0,
                StartPath = new Point(-12.4708, -41.6078),
                EndPath = new Point(-12.4722, -41.6095),
                CreatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero),
                UpdatedAt = new DateTimeOffset(2025, 06, 17, 08, 00, 00, TimeSpan.Zero)
            }
        ];
        
        List<FavoriteBikeRoute> favoriteBikeRoutes = [
            new() { UserId = 1, BikeRouteId = 1 },
            new() { UserId = 1, BikeRouteId = 10 },
            new() { UserId = 1, BikeRouteId = 3 },
            new() { UserId = 2, BikeRouteId = 2 },
            new() { UserId = 2, BikeRouteId = 4 },
            new() { UserId = 3, BikeRouteId = 5 },
            new() { UserId = 3, BikeRouteId = 6 },
            new() { UserId = 4, BikeRouteId = 7 },
            new() { UserId = 4, BikeRouteId = 8 },
            new() { UserId = 5, BikeRouteId = 9 },
            new() { UserId = 5, BikeRouteId = 1 },
            new() { UserId = 6, BikeRouteId = 11 },
            new() { UserId = 6, BikeRouteId = 12 },
            new() { UserId = 1, BikeRouteId = 13 },
            new() { UserId = 2, BikeRouteId = 14 }
        ];
        
        dbContext.Users.AddRange(users);
        dbContext.SaveChanges();
        dbContext.BikeRoutes.AddRange(bikeRoutes);
        dbContext.SaveChanges();
        dbContext.FavoriteBikeRoutes.AddRange(favoriteBikeRoutes);
        dbContext.SaveChanges();
        
        seedTransaction.Commit();
    }
}