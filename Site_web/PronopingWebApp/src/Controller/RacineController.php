<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class RacineController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function index(){
        $lastUsername = $this->getUser();
        if($lastUsername == null ){
            return $this->redirectToRoute('login');
        }
        return $this->redirectToRoute('home');
    }
}