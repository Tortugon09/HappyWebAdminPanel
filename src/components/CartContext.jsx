import {createContext, useState, useEffect, useReducer} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


export const CartContext = createContext();


    export const CartProvider = ({ children }) => {
        const navigate = useNavigate();


            const [open, setOpen] = useState(false);


        const [shipping, setShipping] = useState([])
        const [order, setOrder] = useState([]);
        const [bills, setBills] = useState([]);
    //STATES FOR THE PRODUCTS
    const [products, setProducts] = useState([]);
    //STATES FOR THE USERS
        const [token, setToken] = useState(() => {
            try {
                const ProductsInLocalStorage = localStorage.getItem('token')
                return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : ""
            } catch (error) {
                return "";
            }
        })
        //STATE FOR ALL USERS
    const [users, setUsers] = useState([])
        //STATE FOR THE USER IN SESION
    const [userR, setUserR] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('LoginUserR')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : []
        } catch (error) {
            return [];
        }
    })
        //STATE IF THE USER LOGIN IS TRUE?
    const [loginUser, setLoginUser] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('LoginUser')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : false
        } catch (error) {
            return false;
        }
    })
    //STATES FOR THE ADDRESS
    const [address, setAddress] = useState([{}])
    //STATES FOR THE PAYMENTS
    const [payment,setPayment] = useState([{}])
        console.log(token)

        const instance = axios.create();
        instance.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Authorization'] = token;

    //EJECUTE FOR THE REQUESTS

        const getShipping = async () => {
            await axios.get("http://localhost:8080/shipping")
                .then(({ data }) => setShipping(data.data));
        };

    useEffect(() =>{
        localStorage.setItem("LoginUser", JSON.stringify(loginUser))
    }, [loginUser]);

    useEffect(() =>{
        localStorage.setItem("LoginUserR", JSON.stringify(userR))
    }, [userR]);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getUser();
    }, []);
        useEffect(() => {
            getShipping();
        }, [])
        useEffect(() => {
            getOrder();
        }, [])
        useEffect(() => {
            getBill();
        }, [])
        useEffect(() =>{
            localStorage.setItem("token", JSON.stringify(token))
        }, [token]);





        // REQUEST FOR THE PRODUCTS
        const getProducts = async () => {
            await axios
                .get("http://localhost:8080/product/list")
                .then(({ data }) => setProducts(data.data));


        };
        //POST PRODUCT
    const addProduct = async (product) => {
        const { description,name, quantity, price,cakePicture } = product;

        await axios.post("http://localhost:8080/product", { description ,name, price, quantity,cakePicture });

        getProducts();
    };
    const editProduct = async (product) => {
        const { id, description, name, quantity, price } = product;
        await axios
            .put(`http://localhost:8080/product/${id}`, { description , name, price, quantity });

        getProducts();
    };
    const getproductId = async (product) => {
        const { id } = product;
        await axios
            .get(`http://localhost:8080/product/${id}`)

        getProducts();
    };
    const delateProduct = async (product) => {
        const { id } = product;
        await axios
            .delete(`http://localhost:8080/product/${id}`)

        getProducts();
    };

    // REQUEST FOR THE USERS
        const login = async (user) => {
            const {email, password} = user
            await axios
                .post("http://localhost:8080/login", {email,password})
                .then( async(response) => {
                    setToken(response.headers['authorization'])
                    await axios({
                        method: 'get',
                        url: `http://localhost:8080/client/findByEmail?email=${email}`,
                        headers: {'Authorization': `${response.headers['authorization']}`}
                    }).then(function (response) {
                        console.log(response.data.data)
                        setUserR(response.data.data);
                        setLoginUser(true)
                        navigate("/Home")
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (error) {
                    setOpen(true)
                })
        }

    const getUser = async () => {
        await axios
            .get("http://3.16.48.171:8080/client")
            .then(({ data }) => setUsers(data.data));
    };
    const createUserPost= async(user) => {
            setLoginUser(false)
            const { email, lastName, name, password,phone } = user;
            await axios.post("http://3.16.48.171:8080/client", { email ,lastName , name, password:password , phone:phone });
            getUser();
            navigate("/HappyWeb/LogIn")
        }
    const editUser = async (user) => {
        const {id, email, lastName, name, password,phone } = user;
        console.log(lastName)
        await axios
            .put(`http://3.16.48.171:8080/client/${id}`, { email ,lastName , name, password:password , phone:phone });
        getUser();
        console.log(user)
        setUserR({userInDb: {id:id, email:email, lastName: lastName, name:name,password:password, phone:phone}})
    };

    //REQUEST FOR THE DIRECCIONS
    const addAddress = async(address) => {
        const {state, city, street, houseNumber, zipCode, clientId} = address;
        await axios.post("http://3.16.48.171:8080/address", {state, city, street, houseNumber, zipCode, clientId})
        getAddress();

    }
    const putAddress = async (address) => {
        const {id, state, city, street, houseNumber, zipCode, clientId} = address
        await axios.put(`http://3.16.48.171:8080/address/${id}`, {state, city, street, houseNumber, zipCode, clientId})
        getAddress();
    }
    const delateAddress = async(id) => {
        await axios.delete(`http://3.16.48.171:8080/address/${id}`)
        getAddress();
    }

    //REQUEST FOR THE PAYMENTS
        const addPayment = async(payment) => {
            const {cardNumber,dateExpiry,cardHolder,cardIssuer,cvv,clientId} = payment;
            await axios.post("http://3.16.48.171:8080/payment", {cardNumber,dateExpiry,cardHolder,cardIssuer,cvv,clientId})
            getPayment();

        }
        const putPayment = async (payment) => {
            const {id,cardNumber,dateExpiry,cardHolder,cardIssuer,cvv,clientId} = payment
            await axios.put(`http://3.16.48.171:8080/payment/${id}`, {id,cardNumber,dateExpiry,cardHolder,cardIssuer,cvv,clientId})
            getPayment();
        }
        const delatePayment = async(id) => {
            await axios.delete(`http://3.16.48.171:8080/payment/${id}`)
            getPayment();
        }


    //REQUEST FOR THE SHIPPING
        const addShipping = async(shipping, bill) => {
            const {dateExit,dateReceived} = shipping;
            await axios.post("http://3.16.48.171:8080/shipping", {dateExit,dateReceived})
            addBill(bill);

        }
    //REQUEST FOR THE BILL
        const addBill = async(bill) => {
            const {amount,iva,date} = bill;
            await axios.post("http://3.16.48.171:8080/bill", {amount,iva,date})

        }
    //REQUEST FOR THE STATUSORDER
        const addStatusOrder = async(payment) => {
            const {cardNumber,dateExpiry,cardHolder,cardIssuer,cvv,clientId} = payment;
            await axios.post("http://3.16.48.171:8080/payment", {cardNumber,dateExpiry,cardHolder,cardIssuer,cvv,clientId})
            getPayment();

        }
        const addImg = async (file) => {
            await axios.post("http://3.16.48.171:8080/file", file)
                .then(response =>{
                    console.log(response.data)
                }).catch(error=>{
                    console.log(error)
                })
        }
        const delateShipping = async (id) => {
            await axios
                .delete(`http://3.16.48.171:8080/shipping/${id}`)
            getShipping();
        };
        const delateUser = async (id) => {
            console.log(id)
            await axios
                .delete(`http://3.16.48.171:8080/client/${id}`)
            getUser();
        };
        const getOrder = async () =>{
            await axios
                .get("http://3.16.48.171:8080/order")
                .then(({ data }) => setOrder(data.data));
        }
        const getBill = async () =>{
            await axios
                .get("http://3.16.48.171:8080/bill")
                .then(({ data }) => setBills(data.data));
        }


    return (
        <CartContext.Provider
            value={{
                createUserPost,
                editUser,
                setUserR,
                login,
                setLoginUser,
                products,
                userR,
                loginUser,
                addProduct,
                editProduct,
                delateProduct,
                addAddress,
                address,
                delateAddress,
                payment,
                putAddress,
                addPayment,
                putPayment,
                delatePayment,
                addShipping,
                addImg,
                shipping,
                getShipping,
                delateShipping,
                users,
                delateUser,
                order,
                bills,
                setToken,
                setOpen,
                open
        }}>
            {children}
        </CartContext.Provider>
    );
};