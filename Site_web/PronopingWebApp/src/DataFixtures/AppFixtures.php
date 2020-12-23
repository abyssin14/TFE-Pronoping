<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        $club = new \App\Entity\Club();
        $club->setNom("PC-Purnode");
        $club->setListMatricules(["PpNimda1"]);
        $manager->persist($club);
        $manager->flush();
    }
}
