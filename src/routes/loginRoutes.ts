import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <Form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
`);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  //type guard
  if (email && password && email === 'hi@there.com' && password === 'password') {

    //mark this person as logged in
    req.session = { loggedIn: true };

    //redirect them to the root
    res.redirect('/');

  } else {
    res.send('Invalid email or password');
  }

});

export { router };