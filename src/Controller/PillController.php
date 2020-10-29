<?php

namespace App\Controller;

use App\Entity\Pill;
use App\Form\Type\PillType;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class PillController
 * @package App\Controller
 * @Route("/pills")
 */
class PillController extends AbstractController
{
    /**
     * @Route("", name="get_pills", methods={"GET"})
     */
    public function getPills(EntityManagerInterface $entityManager)
    {
        $pillsRepository = $entityManager->getRepository(Pill::class);
        return $this->json($pillsRepository->findAll());
    }

    /**
     * @Rest\Post("", name="create_pills")
     */
    public function createPill(
        EntityManagerInterface $entityManager,
        Request $request
    ) {
        $pill = new Pill();
        $form = $this->createForm(PillType::class, $pill);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($pill);
            $entityManager->flush();

            return $this->json($pill);
        }

        return $this->json($this->getFormErrors($form), Response::HTTP_BAD_REQUEST);
    }

    /**
     * @Rest\Put("/{id}", name="update_pills")
     */
    public function updatePill(
        Pill $pill,
        EntityManagerInterface $entityManager,
        Request $request
    ) {
        $form = $this->createForm(PillType::class, $pill, ['method' => 'PUT']);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            return $this->json($pill);
        }

        return $this->json($this->getFormErrors($form), Response::HTTP_BAD_REQUEST);
    }

    /**
     * @Route("/{id}", name="delete_pills", methods={"DELETE"})
     */
    public function deletePill(Pill $pill, EntityManagerInterface $entityManager)
    {
        $entityManager->remove($pill);
        $entityManager->flush();
        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @param FormInterface $form
     *
     * @return array
     */
    protected function getFormErrors(FormInterface $form)
    {
        $errors = array();

        // Global
        foreach ($form->getErrors() as $error) {
            $path = explode('.', $error->getCause());
            $errors[end($path)][] = $error->getMessage();
        }

        // Fields
        /** @var FormInterface $child */
        foreach ($form as $child) {
            if ($child->isSubmitted() && !$child->isValid()) {
                foreach ($child->getErrors(true) as $error) {
                    $errors[$child->getName()][] = $error->getMessage();
                }
            }
        }

        return $errors;
    }
}
