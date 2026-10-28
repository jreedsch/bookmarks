import { searchDocuments } from './api.js';
import { createQueryInput } from './components/queryInput.js';
import { createResponseList } from './components/responseList.js';
import { createDocumentDetail } from './components/documentDetail.js';
import { createPageView } from './components/pageView.js';

function select(doc) {
  selected = doc;
  documentDetail.showDocument(doc);
  pageView.show(doc, documentDetail.showSource);
}

async function search(query) {
  console.log("search: "+query)
  const searchId = ++latestSearch;
  select(null);
  responseList.showLoading();

  try {
    const documents = await searchDocuments(query);
    console.log("IN main.search, documents:"+documents)
    if (searchId === latestSearch) responseList.showResults(documents);
  } catch (error) {
    if (searchId === latestSearch) responseList.showError(error.message);
  }
}

let selected = null;
let latestSearch = 0;

const responseList = createResponseList({ onSelect: select });
const documentDetail = createDocumentDetail({
 onShowSourceChange: () => pageView.show(selected, documentDetail.showSource),
});
const pageView = createPageView();
const queryInput = createQueryInput({ onSearch: search });

document.getElementById('left').append(queryInput, responseList.element);
document.getElementById('right').append(documentDetail.element, pageView.element);
