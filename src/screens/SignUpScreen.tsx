"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import '@/global.css'

import { Button } from "@/ui/button"
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,

  FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import {
  Card,
  CardContent,
  
  CardHeader,
  CardTitle,
} from "@/ui/card"

import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6).max(50)
})



export function SignUpScreen() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password:""
      },
      values:{
        username: "",
        password: ""
      }
    })

    const auth = getAuth();
    const navigate = useNavigate();
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      
createUserWithEmailAndPassword(auth, values.username, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem('userId', user.uid)
    navigate('/');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  form.reset();
      
      
    }
    function handleLoginClick(){
      navigate('/login');
    }
    
    return (
      <div>
        <Button variant="outline" className="absolute top-3 right-3" onClick={handleLoginClick}>Login</Button>
      
        <div className="center min-w-[300px] min-h-[400px] bg-card border rounded border-1">
       <Card className="border-none ">
        <CardHeader>
        <CardTitle className="pd-10 pt-10  ">SignUp</CardTitle>
        </CardHeader>
        <CardContent>
  <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
              <FormItem className="space-y-2">
                  <FormControl>
                      <Input placeholder="email" {...field} className="my-3" />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              
                
              )}
             />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
               
                <FormItem className="space-y-2  ">
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              
                
              )}
             />
            <Button type="submit"  className="rounded">SignUp</Button>
          </form>
        </Form>
        </CardContent>
        </Card>

  </div>
  </div>
      )
  }