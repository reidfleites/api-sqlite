import express from "express";

import SqliteManager from "../SqliteManager.js";

const router = express.Router();
const sqm = new SqliteManager("./backend/data/northwind_database.sqlite");

router.get("/top-ten", async (req, res) => {
  const topTen = await sqm.getRecordsWithSql(
    `SELECT ProductID, ProductName, UnitPrice FROM Products ORDER BY UnitPrice desc LIMIT 10`
  );
  res.json({
    message:
      "Ten most expensive products listing name and price, in descending price order:",
    result: JSON.stringify(topTen),
  });
});

router.get("/cheap-products", async (req, res) => {
  const costLess10 = await sqm.getRecordsWithSql(
    `SELECT ProductID, ProductName, UnitPrice, UnitsInStock 
    FROM Products WHERE UnitPrice<10 AND UnitsInStock>0 order by UnitPrice`
  );
  res.send({
    message:
      "Products that cost less than $10 and have multiple units, in ascending price order:",
    result: JSON.stringify(costLess10),
  });
});

router.get("/available-products", async (req, res) => {
  const notDiscountined = await sqm.getRecordsWithSql(
    `SELECT count(*)  FROM Products WHERE Not Discontinued`
  );
  const discountinued = await sqm.getRecordsWithSql(
    `SELECT count(*)  FROM Products WHERE Discontinued`
  );
  res.send({
    discountinued: discountinued,
    notDiscountinued: notDiscountined,
  });
});

const getDatePrice = async (id, callback) => {
  const DatePrice = await sqm.getRecordsWithSql(
    `select CustomerID,orderID,OrderDate,sum(total) as total
from (SELECT CustomerID,Orders.OrderID,OrderDate,UnitPrice,Quantity,(UnitPrice*Quantity) 
as total from Orders  JOIN [Order Details]  
on  Orders.OrderID=[Order Details].OrderID where CustomerID="${id}")GROUP by OrderID`
  );
  callback(DatePrice);
};

router.get("/customer-orders/:id", function (req, res) {
  const id = req.params.id;
  getDatePrice(id, (datePriceRecords) => {
    res.send({
      message: "Date and price of all orders from a specific customer:",
      result: JSON.stringify(datePriceRecords),
    });
  });
});

router.get("/products-supplier/:id", async (req, res) => {
  const id = req.params.id;
  const result = await sqm.getRecordsWithSql(
    `select SupplierID,CompanyName,ProductID ,ProductName from 
        (SELECT * FROM Suppliers JOIN Products on Suppliers.SupplierID=Products.SupplierID) 
        where SupplierID=${id};`
  );
  res.send(JSON.stringify(result));
});

///
router.get("/bottom-ten", async (req, res) => {
  const result = await sqm.getRecordsWithSql(
    `SELECT * FROM (SELECT * FROM (SELECT ProductName,SUM(od.Quantity) AS UnitsSold 
        FROM Products AS p JOIN [Order Details] AS od ON p.ProductID = od.ProductID 
        GROUP BY p.ProductID) 
        ORDER BY UnitsSold DESC LIMIT 10) 
        ORDER BY UnitsSold;
        `
  );
  res.send(JSON.stringify(result));
});

router.get("/customer-city-list", async (req, res) => {
  const result = await sqm.getRecordsWithSql(
    ` select Country from Customers where Customers.Country NOTNULL GROUP by Country;`
  );
  res.send(JSON.stringify(result));
});

export default router;
