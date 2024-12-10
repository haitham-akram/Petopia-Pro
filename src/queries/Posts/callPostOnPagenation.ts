
import Post from "../../database/schemas/postSchema";
import IPost from "../../interfaces/PostDataInterface";

// Add new Post query
const callPostOnPagenation = async (index: string = '0', count: string = '5', userId?: string | undefined) => {
    // const skip = (indexNum) * countNum;
    
    const indexNum = Number.parseInt(index) || 0;
    const countNum = Number.parseInt(count) || 5;

    let FilterPosts = Post.find()

    if(userId){
        FilterPosts =  Post.find({userId})
    }
    const allPosts = FilterPosts.skip(indexNum*countNum).limit(countNum) as unknown as IPost[]
    
  return allPosts;
};

export default callPostOnPagenation;
