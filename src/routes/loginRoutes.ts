import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

//creating a middleware - not supposed to return anything from a middleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // typeguard
  if (req.session && req.session.loggedIn) {
    //if user is logged in then allow to continue
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

const router = Router();





router.get('/', (req: Request, res: Response) => {
  if (/* type guard */ req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});


router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };