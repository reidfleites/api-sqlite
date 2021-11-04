# Create API for Northwind Database

Create a Node/Express API which exposes numerous endpoints that query the Northwind database

## Create basic Node/Express API using the Northwind SQLite database

- create a directory called `northwindapi` and set up a Node/Express API in it
- use what you learned in [exercise 506](https://github.com/FbW-D01/Exercise-506-BE-SER-createSupplierAPIAndWebsite) to create a simple API
- copy the included file `northwind_database.sqlite` to a directory `/data`
- include the class `SqliteManager` that you used in [exercise 508](https://github.com/FbW-D01/Exercise-508-BE-DAT-createANodeExpressEJSSiteThatReadsSQLite)
- create an endpoint `/` which returns the following JavaScript via JSON where `exampleRecords` are the first 10 records from the `Products` table with the following three fields: `ProductID, ProductName, UnitPrice`

```
{
  title: 'Northwind API',
  exampleRecords
}
```

## Test with an API client

- test your `/` endpoint with one of the following tools:
    - [Postman](https://www.postman.com/downloads/)
    - [Insomnia](https://insomnia.rest/download)
    - [VSCode Rest Client Plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Create create-react-app frontend to consume Northwind API

- create a second directory called `northwindfrontend`
- on the `App.js` page, fetch the data from the above `/` endpoint and display title and example records on the page

## Create second "API Examples" page on the frontend

- install React-Router and create a second page called "API Examples" at `/apiexamples`

## Create and fetch the data from the following routes and display them on the page

- for each, display **title** and an **HTML table** showing the records
- if specific fields are not specified, choose appropriate and useful fields to display

**Ten most expensive products listing name and price, in descending price order:** (`/top-ten`)

| Nnnnnn        | Nnn           | Nnnn  |
| ------------- |:-------------:| -----:|
| ........      | .....         | ....  |
| ........      | .....         | ....  |

**Products that cost less than $10 and have multiple units, in ascending price order:** (`/cheap-products`)

| Nnnnnn        | Nnn           | Nnnn  |
| ------------- |:-------------:| -----:|
| ........      | .....         | ....  |
| ........      | .....         | ....  |

**Total number of discontinued and available (non-discontinued) products:** (`/available-products`)

```
Total discontinued: ...
Total available: ...
```

**Date and price of all orders from a specific customer:** (e.g. `/customer-orders/VINET` or `/customer-orders/ANTON`)

Customer: ANTON

| Nnnnnn        | Nnn           | Nnnn  |
| ------------- |:-------------:| -----:|
| ........      | .....         | ....  |
| ........      | .....         | ....  |


**All products from specific supplier ID:** (e.g. `/products-supplier/1` or `/products-supplier/6`)

Products from Customer: Exotic Liquids

| Nnnnnn        | Nnn           | Nnnn  |
| ------------- |:-------------:| -----:|
| ........      | .....         | ....  |
| ........      | .....         | ....  |

**List of 10 worst selling products** (`/bottom-ten`)

| Nnnnnn        | Nnn           | Nnnn  |
| ------------- |:-------------:| -----:|
| ........      | .....         | ....  |
| ........      | .....         | ....  |

**List of all cities that customers are from:** (`/customer-city-list`)

Customers are located in 69 different cities:

```
Aachen
Albuquerque
Anchorage
...
```

## 💪 CHALLENGE: Extend API to allow developers to delete records in the database

- create the following endpoints:
    - `/delete-customer/20`
    - `/delete-product/11`
- test with API client (Postman, Insomnia or Rest Client Plugin)
- create new frontend page called "Delete Records"
    - dropdown showing "Customer" and "Product"
    - input box for ID
    - button named "Delete"
    - display appropriate message
        - *Customer "Ernst Handel" was deleted*
        - *ERROR: Customer with ID 999 was not found*
        

    
# api-sqlite
