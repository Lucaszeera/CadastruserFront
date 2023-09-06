import React from "react"
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {FaEdit, FaTrash} from 'react-icons/fa'

export default function ListaProdutos(){

    const DivLista = styled.div`
        width: 50%; margin: auto; font-family: arial;
        a, button{text-decoration: none; padding: 10px 15px; margin: 10px; background-color: yellowgreen; color: white; display: inline-block; border: none;}
        table{width:100%; margin: auto;}
        thead tr{background-color: darkblue; color: white;}
        thead tr th{padding: 10px; width: 200px}
        tbody tr td{text-align: center}
        tbody tr:nth-child(2n+2){background-color: gray;}
        tfoot tr td{text-align: center; background-color: #333; color: white;}
    `

    const [usuarios, setUsuarios] = useState([])

    useEffect(() =>{
        fetch('http://localhost:8080/cadastruser').then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            setUsuarios(resp.content)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const handleDelete =(id) =>{
        fetch(`http://localhost:8080/cadastruser/${id}`,{
            method:"delete"
        }).then(() => {
            window.location = "/"
        }).catch((error) =>{
            console.log(error)
        })
    }

    return(
        <DivLista>
            <h1>Lista de usuarios</h1>
                <Link to="/incluir">Inserir um usuario</Link>
            <table>
                <thead>
                    <tr>
                        <th>nome</th><th>idade</th><th>numero</th><th>Email</th><th>Editar/Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("usuarios:", usuarios)}
                    {usuarios && usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.idade}</td>
                            <td>{usuario.numero}</td>
                            <td>{usuario.email}</td>
                            <Link to={`/editar/${usuario.id}`}><FaEdit/></Link>
                            <Link onClick={handleDelete.bind(this, usuario.id)}><FaTrash/></Link>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        {console.log("tamanho de usuarios: " + usuarios.length)}
                        <td colSpan="5">Nenhum usuário encontrado</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr><td colSpan="5">Lista de usuarios</td></tr>
                </tfoot>
            </table>
        </DivLista>

    )
}