"""
Nova AI Assistant - Hugging Face Space
Lightweight chatbot using HF Inference API (no local model download)
"""
import gradio as gr
import requests
import os

API_URL = "https://router.huggingface.co/v1/chat/completions"
MODEL = "meta-llama/Llama-3.2-1B-Instruct"
HF_TOKEN = os.environ.get("HF_TOKEN", "")

def predict(message):
    """Call HF Inference API and return the response."""
    try:
        headers = {"Content-Type": "application/json"}
        if HF_TOKEN:
            headers["Authorization"] = f"Bearer {HF_TOKEN}"

        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": "You are Nova, a helpful and friendly AI assistant. Give clear, concise answers."},
                {"role": "user", "content": message},
            ],
            "max_tokens": 256,
            "temperature": 0.7,
            "top_p": 0.9,
        }

        response = requests.post(API_URL, headers=headers, json=payload, timeout=60)

        if response.status_code != 200:
            return f"API Error ({response.status_code}): {response.text[:200]}"

        data = response.json()

        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]

        return str(data)

    except requests.exceptions.Timeout:
        return "Request timed out. Please try again."
    except Exception as e:
        return f"Error: {str(e)}"


demo = gr.Interface(
    fn=predict,
    inputs=gr.Textbox(label="Message", placeholder="Ask Nova anything..."),
    outputs=gr.Textbox(label="Response"),
    title="Nova AI Assistant",
    description="AI Assistant powered by Llama 3.2 via HF Inference API",
    allow_flagging="never",
)

if __name__ == "__main__":
    demo.launch()
