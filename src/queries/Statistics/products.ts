import Product from "../../database/schemas/productSchema"

const getProductStatisticsQuery = async (year: number, month?: number, week?: number) => {
    const match: any = {
        $expr: {
            $add: [
                { $eq: [{ $year: "$createdAt" }, year] }
            ]
        }
    }
    month ? match.$expr.$and.push({ $eq: [{ $month: "$createdAt" }, month] }) : null
    week ? match.$expr.$and.push({ $eq: [{ $week: "$createdAt" }, week] }) : null

    const products = await Product.find(match);
    return {
        total: products.length,
        stillInStock: products.filter((product) => product.stock >= 1).length,
        mostExpensive: products.filter((product) => product.price === Math.max(product.price))
            .map((product) => { return { title: product.title, price: product.price, rating: product.rating } }),
        cheapest: products.filter((product) => product.price === Math.min(product.price))
            .map((product) => { return { title: product.title, price: product.price, rating: product.rating } }),
        highestRated: products.filter((product) => product.rating === Math.max(product.rating))
            .map((product) => { return { title: product.title, price: product.price, rating: product.rating } }),
        lowestRated: products.filter((product) => product.rating === Math.min(product.rating))
            .map((product) => { return { title: product.title, price: product.price, rating: product.rating } }),
    }
}
export default getProductStatisticsQuery