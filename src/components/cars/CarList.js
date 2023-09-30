import React, {useState,useEffect} from "react";

import Car from "./Car";
import classes from "./CarList.module.css"

const CarList = props => {
    const [cars,setCars] = useState([])
    const [loading,setLoading] = useState(undefined)
    const [error,setError] = useState(null)
    const [carsPagination,setCarsPagination] = useState({})
    const [currentPage,setCurrentPage] = useState(0)

    const fetchCarsData = async () => {
        setLoading(true)
        try {
             const res = await fetch("https://car-rental-e95c0-default-rtdb.firebaseio.com/inventory.json")
             const data = await res.json()

             let transformedArr = []
             for(let i in data) {
                const carObj = {
                    ...data[i],
                    id : i
                }
                transformedArr.push(carObj)
             }

             if(!res.ok) {
                throw new Error()
             }

             let pageQuantity = Math.ceil(transformedArr.length / 3)
             console.log(pageQuantity)
             let carsOnSinglePage = 3

             let paginationObject = {}

             for(let i = 0; i < pageQuantity; i++) {
                paginationObject[i] = [
                    ...transformedArr.slice(0, carsOnSinglePage)
                ]
                transformedArr = [...transformedArr.splice(carsOnSinglePage, transformedArr.length - 1)]
             }

             setCars(transformedArr)
             setCarsPagination(paginationObject)
             setLoading(false)
        } catch {
            setLoading(false)
            setError(true)
        }
    }

    const changePage = (page) => {
        setCurrentPage(Number(page))
    }

    // UI

    const pagiNav = []

    for(let i in carsPagination) {
        pagiNav.push(i)
    }

    const pagiNavElement = pagiNav.map(num => {
        return (
            <button onClick={() => {changePage(num)}} key={num} className={Number(num) === currentPage ? classes.active : undefined}>
                {Number(num) + 1}
            </button>
        )
    })

    console.log(carsPagination[currentPage])

    const carsData = carsPagination[currentPage] || cars

    const allCars = carsData.map(car => {
        return (
            <Car
            name = {car.name}
            hp = {car.hp}
            id = {car.id}
            key = {car.id}
            year = {car.year}
            type = {car.type}
            image = {car.image}
            />
        )
    })

    useEffect(() => {
        fetchCarsData()
    }, [])
    return (
        <>
        <div className={classes.cars}>
            {
                error ? <h2>Could not fetch car data</h2> :
                loading ? <h2>Loading ...</h2> :
                allCars
            }
        </div>
        <div className={classes["pagination-nav"]}>
            {pagiNavElement}
        </div>
        </>
    )
}

export default CarList