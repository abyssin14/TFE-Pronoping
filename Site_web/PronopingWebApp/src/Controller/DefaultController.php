<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;


class DefaultController extends AbstractController
{

  private $security;

  public function __construct(Security $security)
  {
      $this->security = $security;
  }

    public function index()
    {
        return $this->render('default/index.html.twig',['user' => $this->security->getUser()]);
    }

}
