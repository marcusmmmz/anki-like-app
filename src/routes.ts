import AddCard from './routes/AddCard.svelte'
import Review from './routes/Review.svelte'
import Settings from "./routes/Settings.svelte";
import NotFound from './routes/NotFound.svelte'

export default {
    "/": Review,
    "/cards/add": AddCard,
    "/settings": Settings,
    '*': NotFound,
}