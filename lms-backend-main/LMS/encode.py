import base64

def encrypt_text(data):
   return  base64.b64encode(data.encode()).decode()
def decrypt_text(encText):
   return base64.b64decode(encText).decode()
