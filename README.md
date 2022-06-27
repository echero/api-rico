# Grupo:   2°  /   BE-A

* ####  [Elyelin Carrasquero](https://github.com/elyelin)
* ####  [Fernando Unias](https://github.com/fernandounias)
* ####  [Ezequiel Cherone](https://github.com/echero)
 
---

#### Descripción del proyecto
 *Es un sistema que permite realizar reservas a restaurantes asi como dejar reseñas y puntuacion a los ya visitados, tiene la funcionalidad de buscar restaurantes bajo diferentes criterios de busqueda asi como tambien guardar dichos restaurantes en una categoria de favoritos.*
 
---

#### Descripción funcionalidades
- Registro: Los usuarios pueden registrarse para tener acceso a la informacion proporcionada por nuestra API
- Usuarios: Pueden guardar y eliminar favoritos de su catálogo
- Restaurantes: Pueden modificar sus datos, asi como tambien guardar, modificar y eliminar su menu
- Busqueda: Los usuarios registrados pueden buscar restaurantes por diferentes categorias
- Reservas: Los usuarios registrados tienen acceso a hacer reservas en el catalago de restaurantes disponibles
- Reseña: Los usuarios registrados tienen la funcionalidad de poder dejar reseñas a los restaurantes visitados

---

#### Reglas de negocio
1. Registrar y guardar los datos de los usuarios (Autenticacion)
2. Los usuarios deben estar registrados para acceder a la informacion de los restaurantes (Autorizacion)
3. Se provee una funcionalidad al usuario para guardar sus restaurantes favoritos
4. Los usuarios pueden buscar restaurantes bajo diferentes parametros
5. Los usuarios registrados pueden hacer una reserva en cualquier restaurante disponible
6. Los restaurantes pueden especificar los días en los cuales se pueden hacer reservas
7. No se puede cancelar una reserva el mismo día
8. Se puede modificar el día y la hora de una reserva
9. Los usuarios pueden dejar reseñas a cada restaurante visitado
10. No se pueden actualizar las reseñas
11. Se pueden eliminar las reseñas
12. Los restaurantes pueden guardar la carta de comidas y bebidas (menu)
13. Cada menú puede tener una cantidad ilimitada de platos
---

#### Declaración de rutas
- Home: /
- Usuario: 
    - /user/id  .........................  (Get)
    - /user/id  .........................  (Delete)
    - /user/id  .........................  (Put)
- Favoritos: 
    - /favorites  .........................  (Get)
    - /favorite/id  .........................  (Get)
    - /favorite/id ......................... (Post)
    - /favorite/id .........................  (Delete)
- Restaurant: 
    - /restaurants  .........................  (Get)
    - /restaurants ......................... (Post)
    - /restaurant/id  .........................  (Get)
    - /restaurant/id  .........................  (Put)
    - /favorite/id  .........................  (Delete) 
- Restaurant menu: 
    - /restaurant/id/menu  .........................  (Post)
    - /restaurant/id/menu  .........................  (Get)
    - /restaurant/id/menu  .........................  (Put)
    -/restaurant/id/menu   .........................  (Delete)
- Busqueda: /search  .........................  (Get)
- Reservas: 
    - /reservation ......................... (Post)
    - /reservation/id ......................... (Get)
    - /reservation/id ......................... (Put)
    - /reservation/id ......................... (Delet)
- Reseñas: 
    - /reviews  ......................... (Post)
    - /reviews/id  ......................... (Get)
---

#### Controladores 
- User
- Restaurant
- Restaurant menu
- Favorite
- Search
- Reservas
- Reseñas
---

#### Test
- UserTest
- RestaurantTest
- RestaurantMenuTest
- FavoriteTest
- SearchTest
- ReservasTest
- ReseñasTest