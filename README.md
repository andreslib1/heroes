# Heroes App

## Descripción
Este proyecto desarrollado en Angular se centra en la implementación de un sistema CRUD (Crear, Leer, Actualizar, Eliminar) dedicado al registro de personajes de cómics, con énfasis en superhéroes. Presenta las características de cada uno, permitiendo además la modificación, eliminación o creación de nuevos personajes. Se fundamenta en una base de datos tipo "backend as a service" para almacenar o modificar la información ingresada.

## Usuario de prueba para login
test@gmail.com 

## Tecnologías Utilizadas
- Angular 16.1
- Dependencias:
  - `@supabase/supabase-js: ^2.39.3`
  - `animate.css: ^4.1.1`
  - `rxjs: ~7.8.0`
  - `Angular Material 16`
- Tailwind CSS

## Características
- El sitio incorpora un sistema de autenticación por correo electrónico, ofreciendo también la opción de registro.
- La gestión y visualización de la información de los personajes se realiza en Angular, a través del consumo de API proporcionadas por Supabase.
- La interfaz principal exhibe los héroes registrados, habilitando su edición y la visualización de información adicional.
- Un menú lateral facilita la creación de personajes o la búsqueda de estos por nombre.

## Utilidades de Angular Aplicadas

- Servicios
- Pipes
- Guards
- Interfaces
- Rutas
- Formularios Reactivos

## Estructura de Módulos y Componentes
A continuación se presenta un diagrama de la estructura de módulos y componentes utilizados en el proyecto:

 <p align="center">
 <img src="/img_readme/componentes.png" width="500">
</p>


- `AppComponent`: El componente raíz de la aplicación Angular.
- `AppModule`: El módulo raíz que declara el AppComponent y otros servicios.
- `AppRoutingModule`: El módulo que maneja las rutas principales de la aplicación.
- `SharedModule`: Un módulo que contiene componentes compartidos.
- `Error404PageComponent`: Un componente que se encarga de mostrar la página de error 404.
- `AuthModule`: Un módulo que agrupa componentes relacionados con la autenticación.
- `LayoutPageComponent`: Un componente que define la estructura del menú layout.
- `MaterialModule`: Un módulo que importa y exporta componentes de Angular Material.
- `HeroesModule`: Un módulo dedicado a la funcionalidad relacionada con "héroes" dentro de la aplicación.
- `ConfirmDialogComponent`, `CardComponent`: Componentes específicos para diálogos de confirmación y presentación de contenido en tarjetas respectivamente.

## Sistema de Rutas

 <p align="center">
 <img src="/img_readme/rutas.png" width="500">
</p>


