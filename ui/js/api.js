import { API_URL } from './config.js';

// POSTs the query and returns the array of documents (see docs/SPEC.md, API CONTRACT).
export async function searchDocuments(query) {
  console.log("IN searchDocuments, query: "+query+", API: "+API_URL)
  let response;
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "query": query }),
    });
  } catch {
    // Network failure, server down, or blocked by CORS.
    throw new Error(`Could not reach the search API at ${API_URL}.`);
  }

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  const documents = await response.json();
  console.log("IN searchDocuments, documents from server: ")
  console.log(documents)
  console.log(typeof(documents))
  //const data = JSON.parse(documents);
  var doclist = documents.result
  console.log(doclist)
  if (!Array.isArray(doclist)) {
    throw new Error('Search failed: expected a JSON array of documents');
  }
  console.log("IN searchDocuments, return:")
  console.log(doclist)
  return doclist;
}
