import React from 'react'

export const OK = 200

export const getHeader = () => ({
    'Content-Type': 'application/json',
    ...getAuth()
})

export const getAuth = () => {
    return(JSON.parse(localStorage.getItem("reduxState")))
}