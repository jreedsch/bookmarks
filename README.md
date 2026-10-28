TODO:
  move keys to config, then gitignore it
  search result relevance!
       rerank search result by cross encoder

# bookmarks
https://github.com/jreedsch/bookmarks/tree/main/ui

run bookmarks client and server

in server dir: python server1.py
 then localhost:8005 in browser

??? /api or /api/ ???
 def do_POST(self):
       print(f"IN do_POST, self.path: {self.path}")
       if self.path != "/api/":
 /api is on localhost:8005

curl --json '{"query": "test"}' http://localhost:8005/api
