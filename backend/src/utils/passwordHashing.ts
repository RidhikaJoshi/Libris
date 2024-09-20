async function passwordHashing(password:string)
{
    // This code is hashing the password for security:
      // 1. It converts the password into a special format computers can process.
      // 2. It then uses a method called SHA-256 to scramble the password.
      // 3. Finally, it turns the scrambled password into a string of letters and numbers.
      // This way, even if someone sees the stored password, they can't figure out the original.
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
      const hashedPassword = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return hashedPassword;
}

export default passwordHashing;
