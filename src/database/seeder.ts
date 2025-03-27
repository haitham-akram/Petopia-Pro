import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

// Import schemas
import AdminEmail from './schemas/adminEmailSchema';
import Bookmark from './schemas/bookmarkSchema';
import Category from './schemas/categorySchema';
import Comment from './schemas/commentSchema';
import Follower from './schemas/followerSchema';
import Like from './schemas/likeSchema';
import Post from './schemas/postSchema';
import User from './schemas/userSchema';
import Pet from './schemas/petSchema';
import PetType from './schemas/petTypeSchema';
import Product from './schemas/productSchema';


// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DEV_DB_URL || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

interface PetDocument extends mongoose.Document {
    ownerId: mongoose.Types.ObjectId;
    petName: string;
    type: mongoose.Types.ObjectId;
    dob: string;
    gender: number;
    petImage: string;
    adoptionStatus: 'available' | 'adopted';
    healthStatus: string;
}

interface ProductDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    stock: number;
    price: number;
    details: string;
    productType?: string; // Optional
    rating: number;
}
interface PetTypeDocument extends mongoose.Document {
    title: string;
}
interface PostDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    categoryId: number;  // enum [0, 1, 2, 3]
    petId?: mongoose.Types.ObjectId;
    productId?: mongoose.Types.ObjectId;
    postContent: string;
    likesCount: number;
    commentsCount: number;
    images: Array<{
        url: string;
    }>;
    bookmarkCount: number;
}
interface LikeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    relateId: mongoose.Types.ObjectId;
    isComment: boolean;
}
// Define seeder functions
const seedAdminEmails = async (count = 3) => {
    try {
        await AdminEmail.deleteMany({});

        const adminEmails = Array.from({ length: count }, () => ({
            email: faker.internet.email(),
        }));

        await AdminEmail.insertMany(adminEmails);
        console.log(`✅ ${count} admin emails seeded`);
    } catch (error) {
        console.error('Error seeding admin emails:', error);
    }
};

const seedCategories = async () => {
    try {
        await Category.deleteMany({});

        const categories = [
            { categoryId: 0, title: 'General' },
            { categoryId: 1, title: 'Adoption' },
            { categoryId: 2, title: 'Lost & Found' },
            { categoryId: 3, title: 'Product' }
        ];

        await Category.insertMany(categories);
        console.log(`✅ ${categories.length} categories seeded`);
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
};

const seedPetTypes = async (): Promise<PetTypeDocument[]> => {
    try {
        await PetType.deleteMany({});

        const petTypes = [
            { title: 'Dog' },
            { title: 'Cat' },
            { title: 'Bird' },
            { title: 'Fish' },
            { title: 'Rabbit' },
            { title: 'Hamster' },
            { title: 'Turtle' }
        ];

        const types = await PetType.insertMany(petTypes);
        console.log(`✅ ${petTypes.length} pet types seeded`);
        return types;
    } catch (error) {
        console.error('Error seeding pet types:', error);
        return [];
    }
};

const seedUsers = async (count = 15) => {
    try {
        await User.deleteMany({});

        const users = Array.from({ length: count }, () => ({
            fullName: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            profileImage: faker.image.avatar(),
            userImage: faker.image.avatar(),
            bio: faker.person.bio(),
            phone: faker.phone.number(),
            verified: faker.datatype.boolean(0.8), // 80% verified
            isAdmin: faker.datatype.boolean(0.1), // 10% admin
            address: faker.location.streetAddress({ useFullAddress: true }),
            status: faker.helpers.arrayElement(['active', 'inactive']),
            followerCount: 0,
            followingCount: 0,
        }));

        const createdUsers = await User.insertMany(users);
        console.log(`✅ ${createdUsers.length} users seeded`);

        // Log first user to verify structure
        if (createdUsers.length > 0) {
            console.log('First user sample:', createdUsers[0]._id);
        } else {
            throw new Error('No users were created - check User schema');
        }

        return createdUsers;
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error; // Rethrow to stop the process
    }
};

const seedPets = async (
    users: mongoose.Document[],
    petTypes: PetTypeDocument[],
    count = 30): Promise<PetDocument[]> => {
    try {
        await Pet.deleteMany({});

        const pets = Array.from({ length: count }, () => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomPetType = petTypes[Math.floor(Math.random() * petTypes.length)];

            return {
                ownerId: randomUser._id,
                petName: faker.person.firstName(),
                type: randomPetType._id,
                dob: faker.date.past({ years: 3 }).toDateString(),
                gender: faker.helpers.arrayElement([0, 1]),
                petImage: `https://loremflickr.com/320/240/${randomPetType.title.toLowerCase()}`,
                adoptionStatus: faker.helpers.arrayElement(['available', 'adopted']),
                healthStatus: faker.helpers.arrayElement(['healthy', 'need treatment']),
            } as PetDocument;
        });

        const createdPets = await Pet.insertMany(pets);
        console.log(`✅ ${createdPets.length} pets seeded`);
        return createdPets;
    } catch (error) {
        console.error('Error seeding pets:', error);
        return [];
    }
};

const seedProducts = async (
    users: mongoose.Document[],
    count = 25
): Promise<ProductDocument[]> => {
    try {
        await Product.deleteMany({});

        const products = Array.from({ length: count }, () => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const productType = faker.helpers.arrayElement([
                'Food', 'Toys', 'Accessories', 'Medicine', 'Grooming', 'Bedding'
            ]);

            return {
                userId: randomUser._id,
                title: faker.commerce.productName(),
                price: faker.number.int({ min: 5, max: 300 }),
                details: faker.commerce.productDescription(),
                productType: productType,
                stock: faker.number.int({ min: 1, max: 200 }), // 80% in stock
                rating: faker.number.int({ min: 1, max: 5 }),
            } as ProductDocument;
        });

        const createdProducts = await Product.insertMany(products);
        console.log(`✅ ${createdProducts.length} products seeded`);
        return createdProducts;
    } catch (error) {
        console.error('Error seeding products:', error);
        return [];
    }
};

const seedPosts = async (
    users: mongoose.Document[],
    pets: PetDocument[],
    products: ProductDocument[],
    count = 50
): Promise<PostDocument[]> => {
    try {
        await Post.deleteMany({});

        const posts = Array.from({ length: count }, () => {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            // Determine post type: pet post, product post, or general/lost&found post
            const postType = faker.helpers.arrayElement(['pet', 'product', 'general']);

            // Create base post object
            const post: any = {
                userId: randomUser._id,
                postContent: faker.lorem.paragraph(4),
                likesCount: 0,
                commentsCount: 0,
                bookmarkCount: 0,
                images: [],
            };

            // Handle different post types with appropriate categoryId
            if (postType === 'pet' && pets.length > 0) {
                // Pet adoption posts (Category 1)
                const randomPet = pets[Math.floor(Math.random() * pets.length)];
                post.petId = randomPet._id;
                post.categoryId = 1; // Adoption category

                // Add pet-specific content
                if (randomPet.adoptionStatus === 'available') {
                    post.postContent = `Looking for a loving home for ${randomPet.petName}! ${faker.lorem.paragraph(1)}`;
                } else {
                    post.postContent = `Meet my adorable pet ${randomPet.petName}! ${faker.lorem.paragraph(1)}`;
                }

                // Add pet image
                post.images = [{
                    url: randomPet.petImage || `https://loremflickr.com/640/480/pet,animal?random=${faker.number.int(1000)}`
                }];

                // Add more images sometimes
                if (faker.datatype.boolean(0.4)) {
                    post.images.push({
                        url: `https://loremflickr.com/640/480/pet,animal?random=${faker.number.int(1000)}`
                    });
                }
            }
            else if (postType === 'product' && products.length > 0) {
                // Product posts (Category 3)
                const randomProduct = products[Math.floor(Math.random() * products.length)];
                post.productId = randomProduct._id;
                post.categoryId = 3; // Product category

                // Add product-specific content
                post.postContent = `For sale: ${randomProduct.title}. ${randomProduct.details} Price: $${randomProduct.price}`;

                // Add product image
                post.images = [{
                    url: `https://loremflickr.com/640/480/pet,product?random=${faker.number.int(1000)}`
                }];

                // Add more product images sometimes
                if (faker.datatype.boolean(0.6)) {
                    post.images.push({
                        url: `https://loremflickr.com/640/480/pet,product?random=${faker.number.int(1000)}`
                    });
                }
            }
            else {
                // General or Lost & Found posts (Category 0 or 2)
                post.categoryId = faker.helpers.arrayElement([0, 2]); // General or Lost & Found

                if (post.categoryId === 2) { // Lost & Found
                    const petStatus = faker.helpers.arrayElement(['LOST', 'FOUND']);
                    const petType = faker.helpers.arrayElement(['dog', 'cat', 'bird', 'rabbit']);
                    post.postContent = `${petStatus}: ${petType} in ${faker.location.city()}. ${faker.lorem.paragraph(2)}`;

                    // Add relevant image for lost/found pet
                    post.images = [{
                        url: `https://loremflickr.com/640/480/${petType}?random=${faker.number.int(1000)}`
                    }];
                } else {
                    // General posts with random images
                    if (faker.datatype.boolean(0.7)) { // 70% have images
                        const imageCount = faker.number.int({ min: 1, max: 3 });
                        post.images = Array.from({ length: imageCount }, () => ({
                            url: faker.image.url()
                        }));
                    }
                }
            }

            return post as PostDocument;
        });

        const createdPosts = await Post.insertMany(posts);
        console.log(`✅ ${createdPosts.length} posts seeded`);
        return createdPosts;
    } catch (error) {
        console.error('Error seeding posts:', error);
        return [];
    }
};

const seedComments = async (users: mongoose.Document[], posts: PostDocument[], count = 100) => {
    try {
        await Comment.deleteMany({});

        const comments = Array.from({ length: count }, () => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomPost = posts[Math.floor(Math.random() * posts.length)];

            return {
                userId: randomUser._id,
                postId: randomPost._id as mongoose.Types.ObjectId,
                commentText: faker.lorem.sentence(),
            };
        });

        // Comments will trigger the middleware to increment the commentsCount on posts
        const createdComments = await Comment.insertMany(comments);
        console.log(`✅ ${createdComments.length} comments seeded`);
        return createdComments;
    } catch (error) {
        console.error('Error seeding comments:', error);
        return [];
    }
};

const seedLikes = async (users: mongoose.Document[], posts: PostDocument[], count = 200) => {
    try {
        await Like.deleteMany({});

        const likes: LikeDocument[] = [];
        // Create unique user-post likes
        const uniquePairs = new Set();

        while (likes.length < count) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomPost = posts[Math.floor(Math.random() * posts.length)];
            const pairKey = `${randomUser._id}-${randomPost._id}`;

            if (!uniquePairs.has(pairKey)) {
                uniquePairs.add(pairKey);
                likes.push({
                    userId: randomUser._id,
                    relateId: randomPost._id,
                    isComment: false,
                } as LikeDocument);
            }
        }

        // Likes will trigger the middleware to increment likesCount on posts
        const createdLikes = await Like.insertMany(likes);

        // Update post likesCount directly since we're bulk inserting
        await Promise.all(
            posts.map(async (post) => {
                const likeCount = likes.filter(like =>
                    like.relateId.toString() === (post._id as mongoose.Types.ObjectId).toString()
                ).length;
                if (likeCount > 0) {
                    await Post.findByIdAndUpdate(post._id, {
                        $set: { likesCount: likeCount }
                    });
                }
            })
        );

        console.log(`✅ ${createdLikes.length} likes seeded`);
    } catch (error) {
        console.error('Error seeding likes:', error);
    }
};

const seedBookmarks = async (users: mongoose.Document[], posts: PostDocument[], count = 50) => {
    try {
        interface MarkedPosts {
            postId: mongoose.Types.ObjectId;
        }

        interface BookmarkDocument extends mongoose.Document {
            userId: mongoose.Types.ObjectId;
            marked_posts: MarkedPosts[];
        }

        await Bookmark.deleteMany({});

        // Create bookmark collections for users
        const bookmarks = [];
        const userBookmarks = new Map<string, BookmarkDocument>();

        for (let i = 0; i < count; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomPost = posts[Math.floor(Math.random() * posts.length)];
            const userId = (randomUser._id as mongoose.Types.ObjectId).toString();

            if (!userBookmarks.has(userId)) {
                userBookmarks.set(userId, {
                    userId: randomUser._id,
                    marked_posts: [] as MarkedPosts[],
                } as BookmarkDocument);
            }

            // Check if post already bookmarked by this user
            const bookmarked = userBookmarks.get(userId)?.marked_posts.some(
                (postId) => postId.toString() === (randomPost._id as mongoose.Types.ObjectId).toString()
            ) ?? false;
            if (!bookmarked) {
                userBookmarks.get(userId)?.marked_posts.push({
                    postId: randomPost._id as mongoose.Types.ObjectId,
                });

                // Increment the bookmarkCount on the post
                await Post.findByIdAndUpdate(randomPost._id, { $inc: { bookmarkCount: 1 } });
            }
        }

        // Convert map to array
        for (const bookmark of userBookmarks.values()) {
            if (bookmark.marked_posts.length > 0) {
                bookmarks.push(bookmark);
            }
        }

        const createdBookmarks = await Bookmark.insertMany(bookmarks);
        console.log(`✅ ${createdBookmarks.length} bookmark collections seeded`);
    } catch (error) {
        console.error('Error seeding bookmarks:', error);
    }
};

const seedFollowers = async (users: mongoose.Document[], count = 70) => {
    try {
        await Follower.deleteMany({});

        const followers = [];
        const uniquePairs = new Set();

        while (followers.length < count) {
            const randomFollower = users[Math.floor(Math.random() * users.length)];
            const randomFollowing = users[Math.floor(Math.random() * users.length)];

            // Prevent self-following and duplicate follows
            if (
                (randomFollower._id as mongoose.Types.ObjectId).toString() !== (randomFollowing._id as mongoose.Types.ObjectId).toString() &&
                !uniquePairs.has(`${randomFollower._id}-${randomFollowing._id}`)
            ) {
                uniquePairs.add(`${randomFollower._id}-${randomFollowing._id}`);
                followers.push({
                    followerId: randomFollower._id,
                    followingId: randomFollowing._id,
                });
            }
        }

        const createdFollowers = await Follower.insertMany(followers);
        console.log(`✅ ${createdFollowers.length} follower relationships seeded`);
    } catch (error) {
        console.error('Error seeding followers:', error);
    }
};

// Main seeding function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        await seedAdminEmails();
        await seedCategories();
        const petTypes = await seedPetTypes();
        const users = await seedUsers();
        if (!users || users.length === 0) {
            throw new Error('Failed to seed users - terminating process');
        }
        const pets = await seedPets(users, petTypes);
        const products = await seedProducts(users);
        const posts = await seedPosts(users, pets, products);
        await seedComments(users, posts);
        await seedLikes(users, posts);
        await seedBookmarks(users, posts);
        await seedFollowers(users);

        console.log('✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database seeding failed:', error);
        process.exit(1);
    }
};

// Run the seeder
seedDatabase();