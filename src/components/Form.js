import React from 'react'
import {useState, useEffect} from 'react'
import './form.css'


const Form = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values, 
            [name]: value
        })
    }

    const [errors, setErrors] = useState({})
    const validate = (values) => {
        let errors = {}
        if(!values.name.trim()){
            errors.name = "Name required"
        }
        if(!values.email){
            errors.email = "Email required"
        } 
        if(!values.message){
            errors.message = "Message is required"
        }
        return errors
    }

    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = e => {
        setErrors(validate(values))
        setIsSubmitted(true)
        e.preventDefault();
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
      }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitted){
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "contact", ...values })
            })
            .then(() => alert("Success!"))
            .then(() => setValues({name: "", email: "",  message: ""}))
            .then(() => setIsSubmitted(false))
            .catch(error => alert(error))
        }
    }, [errors, values, isSubmitted])
    

    return (
        <div >
            <h1> Sample Form </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>     
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="form-input" 
                        value={values.name} 
                        onChange={handleChange}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>     
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-input" 
                        value={values.email} 
                        onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="message" className="form-label">
                        Message
                    </label>     
                    <textarea  
                        name="message" 
                        id="message" 
                        className="form-input" 
                        value={values.message} onChange={handleChange} />
                    {errors.message && <p>{errors.message}</p>}
                </div>
                <button type="submit" className="form-input-btn">
                    Send
                </button>
            </form>
        </div>
        
    )
}

export default Form

