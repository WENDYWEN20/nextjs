//CRUD methods below as the route layer
//get request

export async function GET(request: Request){
     return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
      });
}