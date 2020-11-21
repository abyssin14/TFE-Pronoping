<?php

namespace App\Validator;

use App\Repository\ClubRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class IsMatriculeValideValidator extends ConstraintValidator
{
    private $clubRepository;
    public function __construct(ClubRepository $clubRepository)
    {
        $this->clubRepository = $clubRepository;
    }
    public function validate($matricule, Constraint $constraint)
    {
        /* @var $constraint \App\Validator\IsMatriculeValide */

        if (null === $matricule || '' === $matricule) {
            return;
        }

        // TODO: implement the validation here
        $club = $this->clubRepository->find(7);
        $listMatricule = $club->getListMatricules();
        $isFind = false;
        for ($i = 0; $i < count($listMatricule); $i++){
            if($listMatricule[$i] == $matricule){
                $isFind = true;
            }
        }
        if($isFind){
         return;
        }
        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ matricule }}', $matricule)
            ->addViolation();
    }
}
