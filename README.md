## Welcome to an e-commerce server repository

**For live deployment link** [click here](https://e-commerce-backend-ass2.vercel.app/) <br>
or visit **https://e-commerce-backend-ass2.vercel.app/**
<br>
If you clone this project to your local folder and try to run on your pc follow this steps:

- **`git clone https://github.com/burhanuddinrabby/ecommerce-management-server.git`**
- **`cd ecommerce-management-server`**
- **`npm i`**
- **`npm run start-dev`**
- Open your browser and hit the url **`http://localhost:5000`**

# To upload a product:

**ENDPOINT** : **`api/products`** <br>
**METHOD** : **`POST`**<br>
**REQUEST TYPE:** <br>

```js
{
    name: string,
    description: string,
    price: positive integer,
    category: string,
    tags: string[],
    variants: [
        {
            type: string //"Color",
            value: string //"Midnight Blue"
        }
    ],
    inventory: {
        quantity: positive number,
        inStock: boolean
    }
}
```

**A SUCCESSFUL RESPONSE**

```json
{
    "success": true,
    "message": "Product created successfully!",
    "data": {
        ...data
    }
}
```

#

# Get all product

**ENDPOINT** : **`api/products`** <br>
**METHOD** : **`GET`**<br>
**A SUCCESSFUL RESPONSE**

```json
{
  "success": true,
  "message": "Products fetched successfully!",
  "data": [
    // All Products will be shown here...
  ]
}
```

#

# Single product with specific id

**ENDPOINT** : **`api/products/:productId`** <br>
**METHOD** : **`GET`**<br>
**A SUCCESSFUL RESPONSE** <br>

```json
{
  "success": true,
  "message": "Product fetched successfully!",
  "data": {
    //data corresponding to the product id
  }
}
```

#

# Update a product

**Endpoint**: **`/api/products/:productId`** <br>
**Method: `PUT`** <br>
**REQUEST TYPE:** <br>

```js
{
    name: string,
    description: string,
    price: positive integer,
    category: string,
    tags: string[],
    variants: [
        {
            type: string,
            value: string
        }
    ],
    inventory: {
        quantity: positive number,
        inStock: boolean
    }
}
```

**A SUCCESSFUL RESPONSE** <br>

```json
{
  "success": true,
  "message": "Product updated successfully!",
  "data": {
    //data corresponding to the product
  }
}
```

#

# Delete a product

**Endpoint**: **`/api/products/:productId`** <br>
**Method: `DELETE`** <br>
**A SUCCESSFUL RESPONSE** <br>

```json
{
  "success": true,
  "message": "Product deleted successfully!",
  "data": null
}
```

#

# Search a product by query

**Endpoint**: `/api/products?searchTerm=iphone` <br>
**Method:** **`GET`** <br>
**A SUCCESSFUL RESPONSE** <br>

```json
{
  "success": true,
  "message": "Products matching search term 'iphone' fetched successfully!",
  "data": [
    {
      //
    }
  ]
}
```
