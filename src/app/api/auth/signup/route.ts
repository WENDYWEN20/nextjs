//CRUD methods below as the route layer
//get request
import bcrypt from 'bcrypt'
const saltRounds=10
const usersData = [
  { userName: "John", email: "john@gmail.com", password: "abc" },
  { userName: "Molly", email: "molly@gmail.com", password: "def" },
  { userName: "Emma", email: "emma@gmail.com", password: "ghi" },
];
export async function POST(request: Request) {
  console.log("will log out in the console");
  const {userName, email, password}=await request.json()
  console.log("data",{userName, email, password});
  const hashedPassword=await bcrypt.hash(password, saltRounds);
  usersData.push({userName, email, password:hashedPassword})
  // Send a response
 console.log("usersData",usersData);
  return new Response(JSON.stringify(usersData), {
        headers: { 'Content-Type': 'application/json' },
      });;
}
export async function GET(request: Request) {
  console.log('getRequest', usersData)
  return new Response(JSON.stringify(usersData), {
        headers: { 'Content-Type': 'application/json' },
      });;
}
