# oxford-dictionary-cli
- This simple snippet allows you to look up Oxford dictionary word definitions
right from the command line
- The Oxford dictionary offers rich and reliable definitions, thesauruses, and 
translations to many languages

## Register for an Oxford developer account
- Follow this [link](https://developer.oxforddictionaries.com/login) to sign up for
an Oxford developer account.
    - Free account offers 3K requests per month. They have other paid plans
    if you need more
    - [FAQ](https://developer.oxforddictionaries.com/FAQ#plan_pricing)

- Add the **app_id** and **app_key** in the **CONFIG** object in the **oxford.js**

## Make an aliases file to search quicker
- Point your **.bashrc** or **.zshrc** to the **aliases** file

```
    // aliases file
    alias d='DIRECTORY_TO_OXFORD.JS'

    // search away
     ~> d blue
     >> Adjective
    of a colour intermediate between green and violet, as of the sky or sea on a sunny day
    (of a person or mood) melancholy, sad, or depressed
    (of a film, joke, or story) having sexual or pornographic contentpolitically conservative

    >> Noun
    blue colour or pigment
    a small butterfly, the male of which is predominantly blue while the female is typically brown.
    a person who has represented Cambridge University (a Cambridge blue) or Oxford University (an Oxford blue) at a particular sport in
    a match between the two universities
    an argument or fight
    a mistake
    a nickname for a red-headed person
    a supporter of the Conservative Party.

    >> Verb
    make or become blue
    wash (white clothes) with bluing
    squander or recklessly spend (money). 

```

