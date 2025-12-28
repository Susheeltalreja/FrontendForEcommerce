export const registerFormInput = [
    {
        name: "UserName",
        placeholder: "Enter your name?",
        label: "Name",
        type: "text",
        componentType: "input"
    }, {
        name: "UserEmail",
        placeholder: "Enter your email?",
        label: "Email",
        type: "email",
        componentType: "input"
    }, {
        name: "UserPassword",
        placeholder: "Enter your password?",
        label: "Password",
        type: "password",
        componentType: "input"
    }
]

export const loginFormInputs = [
    {
        name: "UserEmail",
        placeholder: "Enter your email?",
        label: "Email",
        type: "email",
        componentType: "input"
    }, {
        name: "UserPassword",
        placeholder: "Enter your password?",
        label: "Password",
        type: "password",
        componentType: "input"
    }
]

export const addProductsFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter your product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product's description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    placeholder: "Cateory",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "footwear",
        label: "Footwear",
      },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    placeholder: "Brand",

    options: [
      {
        id: "nike",
        label: "Nike",
      },
      {
        id: "adidas",
        label: "Adidas",
      },
      {
        id: "puma",
        label: "Puma",
      },
      {
        id: "levis",
        label: "Levi's",
      },
      {
        id: "zara",
        label: "Zara",
      },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product's price",
  },
  {
    label: "Sale Price (Optional)",
    name: "saleprice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    type: "number",
    placeholder: "Enter total stock",
    componentType: "input",
  },
];

export const ForgetPasswordForm1 = [
  {
    label: "User Email",
    name: "UserEmail",
    type: "email",
    placeholder: "Enter your email here",
    componentType: "input"
  }
]

export const ForgetPasswordForm2 = [
  {
    label: "New Password",
    name: "UserPassword",
    type: "Password",
    placeholder: "Type your new password",
    componentType: "input"
  },
  {
    label: "Confirm New Password",
    name: "cpassword",
    type: "Password",
    placeholder: "Type your confirm password",
    componentType: "input"
  }
]