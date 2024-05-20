# K13-test-backend-laravel by Vitor Siqueira

## English Version:

This project is a test for the K13 trainee position in back-end. It implements a contact storage and management system built with Laravel.

### About the Project

This application allows users to:

-   **Manage Contacts:** Create, edit, and store contact information, including full name, CPF (unique), email (unique), and date of birth. The date of birth is stored in YYYY/MM/DD format in the database but displayed as DD/MM/YYYY to the user.
-   **Link Addresses:** Assign addresses to contacts. The form allows for creating new addresses or editing existing ones. Address information includes CEP, street, number, neighborhood, city, and state (selected from a dropdown list of all 27 Brazilian states).
-   **Link Phone Numbers:** Add and manage phone numbers for each contact. The application includes fields for commercial, residential, and mobile phone numbers (mandatory), ensuring that each number is unique in the database. The form dynamically loads existing phone information for editing.
-   **Search Contacts:** Search for contacts using a text input field by name or any part of their name. The application displays a list of all matching contacts along with their details.

### Getting Started

**Prerequisites:**

-   Docker
-   Docker Compose

**Verify Docker Installation:**

Run `docker-compose --version`. If Docker and Docker Compose are installed correctly, you should see a message similar to "docker-compose version 1.29.2".

**Running the Project:**

1. Open Docker.
2. Navigate to the project directory in your terminal.
3. Run the following commands:

    ```bash
    ./vendor/bin/sail up
    ./vendor/bin/sail npm run dev
    ```

4. Access the application at: `http://localhost/`

### Project Structure

The project follows the standard Laravel structure. Key files and directories include:

-   **app:** Contains the core application logic, including models, controllers, middleware and rules.
-   **database:** Holds database migrations and seeders.
-   **resources:** Contains views (Blade templates), frontend assets (React, JavaScript, CSS), and language files.
-   **routes:** Defines the application's routes.

## Portuguese Version:

Este projeto é um teste para a vaga de trainee K13 na área de back-end. Ele implementa um sistema de armazenamento e gerenciamento de contatos construído com Laravel.

### Sobre o Projeto

Esta aplicação permite que os usuários:

-   **Gerenciar Contatos:** Criar, editar e armazenar informações de contato, incluindo nome completo, CPF (único), e-mail (único) e data de nascimento. A data de nascimento é armazenada no formato AAAA/MM/DD no banco de dados, mas exibida como DD/MM/AAAA para o usuário.
-   **Vincular Endereços:** Atribuir endereços aos contatos. O formulário permite criar novos endereços ou editar os existentes. As informações de endereço incluem CEP, rua, número, bairro, cidade e estado (selecionado em uma lista suspensa de todos os 27 estados brasileiros).
-   **Vincular Números de Telefone:** Adicionar e gerenciar números de telefone para cada contato. O aplicativo inclui campos para telefone comercial, residencial e celular (obrigatório), garantindo que cada número seja único no banco de dados. O formulário carrega dinamicamente as informações de telefone existentes para edição.
-   **Pesquisar Contatos:** Pesquisar contatos usando um campo de entrada de texto por nome ou qualquer parte do nome. O aplicativo exibe uma lista de todos os contatos correspondentes, juntamente com seus detalhes.

### Começando

**Pré-requisitos:**

-   Docker
-   Docker Compose

**Verificar a Instalação do Docker:**

Execute `docker-compose --version`. Se o Docker e o Docker Compose estiverem instalados corretamente, você deverá ver uma mensagem semelhante a "docker-compose version 1.29.2".

**Executando o Projeto:**

1. Abra o Docker.
2. Navegue até o diretório do projeto no seu terminal.
3. Execute os seguintes comandos:

    ```bash
    ./vendor/bin/sail up
    ./vendor/bin/sail npm run dev
    ```

4. Acesse o aplicativo em: `http://localhost/`

### Estrutura do Projeto

O projeto segue a estrutura padrão do Laravel. Os principais arquivos e diretórios incluem:

-   **app:** Contém a lógica principal do aplicativo, incluindo models, controllers, middleware e rules.
-   **database:** Armazena migrações de banco de dados e seeders.
-   **resources:** Contém views (templates Blade), assets de front-end (React, JavaScript, CSS) e arquivos de idioma.
-   **routes:** Define as rotas do aplicativo.

### License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
