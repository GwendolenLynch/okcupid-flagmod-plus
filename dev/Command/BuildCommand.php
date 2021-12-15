<?php

declare(strict_types=1);

namespace OkCupid\FlagmodPlus\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use tidy;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use function dirname;
use function file_put_contents;
use function mkdir;
use function realpath;

final class BuildCommand extends Command
{
    protected static $defaultName = 'build:html';

    private Environment $twig;
    private string $distDir;
    private array $options = [
        'indent' => true,
        'indent-spaces' => 4,
        'quiet' => true,
        'drop-empty-elements' => false,
        'wrap' => 0,
    ];

    public function __construct()
    {
        parent::__construct();

        $this->distDir = realpath(__DIR__ . '/../../dist');
    }

    protected function configure(): void
    {
        $this->twig = new Environment(
            new FilesystemLoader([dirname(__DIR__, 2) . '/templates']),
            [
                'debug' => true,
                'strict_variables' => true,
            ]
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->renderOptions();
        $this->renderFlagmodForm();

        return Command::SUCCESS;
    }

    private function renderOptions(): void
    {
        $tidy = new tidy();
        $tidy->parseString($this->twig->render('options/index.html.twig'), $this->options);
        $this->ensureDirectory($this->distDir . '/html');
        file_put_contents($this->distDir . '/html/options.html', (string) $tidy);
    }

    private function renderFlagmodForm(): void
    {
        $context = [
            'buttons' => [
                [
                    "label" => "Obscene",
                    "colour" => "red",
                    "vote" => 11,
                    "report" => [
                        "label" => 8,
                        "type" => 0,
                        "comment" => "Obscene"
                    ]
                ],
                [
                    "label" => "Deleted",
                    "colour" => "blue",
                    "vote" => 1,
                    "report" => null
                ],
                [
                    "label" => "Left alone",
                    "colour" => "green",
                    "vote" => 0,
                    "report" => null
                ]
            ]
        ];

        $tidy = new tidy();
        $tidy->parseString($this->twig->render('flagmod/flagmod-form.html.twig', $context), $this->options + ['show-body-only' => true]);
        $this->ensureDirectory($this->distDir . '/html/form');
        file_put_contents($this->distDir . '/html/form/flagmod-vote-buttons.html', (string) $tidy);
    }

    private function ensureDirectory(string $dirPath): void
    {
        @mkdir($dirPath, 0775, true);
    }
}
