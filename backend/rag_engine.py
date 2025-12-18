# backend/rag_engine.py
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.schema import Document
from dotenv import load_dotenv
import os

load_dotenv()

def get_qa_chain(chunks):
    """Create QA chain with FAISS and Groq"""
    
    # Chunks are already Document objects from pdf_utils.py
    documents = chunks
    
    print(f"Creating vector store with {len(documents)} documents")
    if documents:
        print(f"First chunk preview: {documents[0].page_content[:150]}...")
    
    # Initialize embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    
    # Create FAISS vector store
    vectorstore = FAISS.from_documents(documents, embeddings)
    
    # Initialize Groq LLM
    llm = ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.3-70b-versatile",  # Updated to working model
        temperature=0.1
    )
    
    # Custom prompt template for better context usage
    prompt_template = """Use the following pieces of context from the uploaded PDF to answer the question. 
If you cannot find the answer in the context, say "I cannot find that information in the uploaded document."
Do not make up information that is not in the context.

Context:
{context}

Question: {question}

Detailed Answer:"""
    
    PROMPT = PromptTemplate(
        template=prompt_template,
        input_variables=["context", "question"]
    )
    
    # Create retrieval QA chain with proper configuration
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 4}  # Retrieve top 4 most relevant chunks
        ),
        return_source_documents=False,
        chain_type_kwargs={"prompt": PROMPT}
    )
    
    return qa_chain