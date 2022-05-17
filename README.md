# 2 BE-A

### Elyelin Carrasquero
### Fernando Unias
### Ezequiel Cherone

#### Descripción del proyecto
 *Creación un entorno de recomendaciones de restaurantes que sea inclusivo y apto tanto para usuarios, exploradores, conocedores, así como también para los dueños de restaurantes o pequeños emprendimientos de comida extranjera que puedan recibir más visibilidad.*
 
#### Descripción funcionalidades
* *

#### Reglas de negocio
1. Registrar y guardar los datos de los usuarios  (Autenticacion)
2. Los usuarios deben estar registrados para acceder a la informacion de los restaurant (Autorizacion)
3. AMV de usuarios, restaurant y favoritos
4. Los usuarios pueden guardar un restaurant a sus favoritos
5. Los restaurant van a poder guardar la carta de comidas y bebidas
6. Los usuarios pueden buscar restaurant 
//cambiar el nombre restaurant

#### Declaración de rutas
- Home: /api
- Registro: /api/register  .........................  (Post)
- Usuario: /api/user/id  .........................  (Get)
    - /api/user/id/delete  .........................  (Delete)
    - /api/user/id/put  .........................  (Put)
- Favoritos: /api/favorites  .........................  (Get)
    - /api/favorite/id  .........................  (Get)
    - /api/favorite/id/delete  .........................  (Delete)
- Restaurant: /api/restaurants  .........................  (Get)
    - /api/restaurant/id  .........................  (Get)
    - /api/restaurant/id/put  .........................  (Put)
    - /api/favorite/id/delete  .........................  (Delete) 
- Restaurant menu: /api/restaurant/id/menu  .........................  (Post)
    - /api/restaurant/id/menu  .........................  (Get)
    - /api/restaurant/id/menu/put  .........................  (Put)
    -/api/restaurant/id/menu/delete   .........................  (Delete)
- Busqueda: /api/search/  .........................  (Get)


#### Controladores 
- Register
- User
- Restaurant
- Restaurant menu
- Favorite
- Search

#### Test
- RegisterTest
- UserTest
- RestaurantTest
- RestaurantMenuTest
- FavoriteTest
- SearchTest



archivo de texto donde se incluya una posible planificación de la implementación del proyecto; no debe tener ningún formato en particular, pero sí incluir una idea aproximada de posibles tareas a realizar hasta finalizar la cursada, por integrante; Requerirá un poco de debate/discusión.
