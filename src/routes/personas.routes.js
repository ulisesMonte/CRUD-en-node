import { Router } from "express";
import pool from "../database.js";  // Asegúrate de importar el archivo correcto

const personasRoutes = Router();
personasRoutes.get("/add",(req,res)=>{
    res.render("personas/add")
})


personasRoutes.post("/add",async(req,res)=>{
    try {
        const {name, lastname, age} = req.body
        const newPersona = {
            name,lastname,age
        }
        const columns=Object.keys(newPersona).join(",")
        const values = Object.values(newPersona)
        const query = `INSERT INTO personas (${columns}) VALUES (?)`
        const result = await pool.query(query, [values]);
        res.redirect("/list")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
personasRoutes.get("/list", async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM personas");
        res.render("./personas/list",{personas: result})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
personasRoutes.get("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const [persona] = await pool.query("SELECT *FROM personas WHERE id = ?",[id])
        const personaEdit = persona[0];
        res.render("./personas/edit", {persona: personaEdit})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

personasRoutes.post("/edit/:id",async(req,res)=>{
    try {
        const {name,lastname,age} = req.body
        const {id}=req.params
        const editPersona={name,lastname,age}
        await pool.query("UPDATE personas SET ? WHERE ID = ?" , [editPersona,id])
        res.redirect("/list")

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

personasRoutes.get("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params
        await pool.query("DELETE FROM personas WHERE id = ?", [id])
        res.redirect("/list")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
export default personasRoutes;
